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

        private readonly IWorkoutScheduleRepository _workoutScheduleRepository;

        private readonly IMealScheduleRepository _mealScheduleRepository;
        private readonly IMapper _mapper;

        public PostController(IFoodRepository foodRepository, IMapper mapper, IExerciseRepository exerciseRepository,
            IWorkoutScheduleRepository workoutScheduleRepository, IMealScheduleRepository mealScheduleRepository)
        {
            _foodRepository = foodRepository;
            _mapper = mapper;
            _exerciseRepository = exerciseRepository;
            _workoutScheduleRepository = workoutScheduleRepository;
            _mealScheduleRepository = mealScheduleRepository;
        }


        [HttpGet("GetAllHomeApprovedPosts")]
        public async Task<ActionResult> GetAllHomeApprovedPosts()
        {
            try
            {
                var foodTask = _foodRepository.GetApprovedFoods();
                var exerciseTask = _exerciseRepository.GetApprovedExercises();
                var workoutScheduleTask = _workoutScheduleRepository.GetApprovedWorkoutSchedules();
                var mealScheduleTask = _mealScheduleRepository.GetApprovedMealSchedules();

                await Task.WhenAll(foodTask, exerciseTask, workoutScheduleTask, mealScheduleTask);

                // Lấy kết quả từ các task
                var foods = await foodTask;
                var exercises = await exerciseTask;
                var workoutSchedules = await workoutScheduleTask;
                var mealSchedules = await mealScheduleTask;

                // Map từ Food và Exercise sang PostDTO
                var foodPosts = _mapper.Map<List<PostDTO>>(foods);
                var exercisePosts = _mapper.Map<List<PostDTO>>(exercises);
                var workoutSchedulePosts = _mapper.Map<List<PostDTO>>(workoutSchedules);
                var mealSchedulePosts = _mapper.Map<List<PostDTO>>(mealSchedules);

                // Gán loại bài post (food hoặc exercise)
                foreach (var post in foodPosts)
                {
                    post.PostType = "food";
                }

                foreach (var post in exercisePosts)
                {
                    post.PostType = "exercise";
                }

                foreach (var post in workoutSchedulePosts)
                {
                    post.PostType = "workout";
                }

                foreach (var post in mealSchedulePosts)
                {
                    post.PostType = "meal";
                }

                // Gộp cả hai danh sách lại
                var allPosts = new List<PostDTO>();
                allPosts.AddRange(foodPosts);
                allPosts.AddRange(exercisePosts);
                allPosts.AddRange(workoutSchedulePosts);
                allPosts.AddRange(mealSchedulePosts);

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
                var workoutScheduleTask = _workoutScheduleRepository.GetApprovedWorkoutsByUserId(userId);
                var mealScheduleTask = _mealScheduleRepository.GetApprovedMealsByUserId(userId);

                await Task.WhenAll(foodTask, exerciseTask, workoutScheduleTask, mealScheduleTask);

                var foodPosts = _mapper.Map<List<PostDTO>>(await foodTask);
                var exercisePosts = _mapper.Map<List<PostDTO>>(await exerciseTask);
                var workoutSchedulePosts = _mapper.Map<List<PostDTO>>(await workoutScheduleTask);
                var mealSchedulePosts = _mapper.Map<List<PostDTO>>(await mealScheduleTask);

                foreach (var post in foodPosts) post.PostType = "food";
                foreach (var post in exercisePosts) post.PostType = "exercise";
                foreach (var post in workoutSchedulePosts) post.PostType = "workout";
                foreach (var post in mealSchedulePosts) post.PostType = "meal";

                var allPosts = foodPosts.Concat(exercisePosts).Concat(workoutSchedulePosts).Concat(mealSchedulePosts)
                                        .OrderByDescending(p => p.CreatedDate)
                                        .ToList();

                return Ok(allPosts);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data: " + e.Message);
            }
        }


        [HttpGet("SearchByKeyword")]
        public async Task<ActionResult> SearchByKeyword(string keyword)
        {
            try
            {
                var foodTask = _foodRepository.GetFoodsByKeyWord(keyword);
                var exerciseTask = _exerciseRepository.GetExercisesByKeyWord(keyword);
                var workoutScheduleTask = _workoutScheduleRepository.GetWorkoutSchedulesByKeyWord(keyword);
                var mealScheduleTask = _mealScheduleRepository.GetMealSchedulesByKeyWord(keyword);

                await Task.WhenAll(foodTask, exerciseTask, workoutScheduleTask, mealScheduleTask);

                // Lấy kết quả từ các task
                var foods = await foodTask;
                var exercises = await exerciseTask;
                var workoutSchedules = await workoutScheduleTask;
                var mealSchedules = await mealScheduleTask;

                // Map từ Food và Exercise sang PostDTO
                var foodPosts = _mapper.Map<List<PostDTO>>(foods);
                var exercisePosts = _mapper.Map<List<PostDTO>>(exercises);
                var workoutSchedulePosts = _mapper.Map<List<PostDTO>>(workoutSchedules);
                var mealSchedulePosts = _mapper.Map<List<PostDTO>>(mealSchedules);

                // Gán loại bài post (food hoặc exercise)
                foreach (var post in foodPosts)
                {
                    post.PostType = "food";
                }

                foreach (var post in exercisePosts)
                {
                    post.PostType = "exercise";
                }
                foreach (var post in workoutSchedulePosts)
                {
                    post.PostType = "workout";
                }
                foreach (var post in mealSchedulePosts)
                {
                    post.PostType = "meal";
                }

                // Gộp cả hai danh sách lại
                var allPosts = new List<PostDTO>();
                allPosts.AddRange(foodPosts);
                allPosts.AddRange(exercisePosts);
                allPosts.AddRange(workoutSchedulePosts);
                allPosts.AddRange(mealSchedulePosts);

                return Ok(allPosts.OrderByDescending(p => p.CreatedDate));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database:" + e.Message);
            }
        }
    }
}
