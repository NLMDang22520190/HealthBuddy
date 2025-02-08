using System.Diagnostics;
using AutoMapper;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IFoodRepository _foodRepository;
        private readonly IExerciseRepository _exerciseRepository;
        private readonly IMapper _mapper;

        public PostController(IFoodRepository foodRepository, IMapper mapper, IExerciseRepository exerciseRepository)
        {
            _foodRepository = foodRepository;
            _mapper = mapper;
            _exerciseRepository = exerciseRepository;
        }

        [HttpGet("GetAllHomeApprovedPosts")]
        public async Task<ActionResult> GetAllHomeApprovedPosts()
        {
            try
            {
                var foodTask = _foodRepository.GetApprovedFoods();
                var exerciseTask = _exerciseRepository.GetApprovedExercises();

                await Task.WhenAll(foodTask, exerciseTask);

                // Lấy kết quả từ các task
                var foods = await foodTask;
                var exercises = await exerciseTask;

                // Map từ Food và Exercise sang PostDTO
                var foodPosts = _mapper.Map<List<PostDTO>>(foods);
                var exercisePosts = _mapper.Map<List<PostDTO>>(exercises);

                // Gán loại bài post (food hoặc exercise)
                foreach (var post in foodPosts)
                {
                    post.PostType = "food";
                }

                foreach (var post in exercisePosts)
                {
                    post.PostType = "exercise";
                }

                // Gộp cả hai danh sách lại
                var allPosts = new List<PostDTO>();
                allPosts.AddRange(foodPosts);
                allPosts.AddRange(exercisePosts);

                return Ok(allPosts.OrderByDescending(p => p.CreatedDate));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database:" + e.Message);
            }
        }

        [HttpGet("GetAllUserApprovedPosts/{userId}")]
        public async Task<ActionResult> GetAllUserApprovedPosts(int userId)
        {
            try
            {
                var foodTask = _foodRepository.GetApprovedFoodsByUserId(userId);
                var exerciseTask = _exerciseRepository.GetApprovedExercisesByUserId(userId);

                await Task.WhenAll(foodTask, exerciseTask);

                var foodPosts = _mapper.Map<List<PostDTO>>(await foodTask);
                var exercisePosts = _mapper.Map<List<PostDTO>>(await exerciseTask);

                foreach (var post in foodPosts) post.PostType = "food";
                foreach (var post in exercisePosts) post.PostType = "exercise";

                var allPosts = foodPosts.Concat(exercisePosts)
                                        .OrderByDescending(p => p.CreatedDate)
                                        .ToList();

                return Ok(allPosts);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data: " + e.Message);
            }
        }



    }
}
