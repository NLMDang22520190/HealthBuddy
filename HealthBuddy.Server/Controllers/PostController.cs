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
        private readonly IMapper _mapper;

        public PostController(IFoodRepository foodRepository, IMapper mapper)
        {
            _foodRepository = foodRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllHomeApprovedPosts")]
        public async Task<ActionResult> GetAllHomeApprovedPosts()
        {
            try
            {
                var foods = await _foodRepository.GetApprovedFoods();
                var postDTO = _mapper.Map<List<PostDTO>>(foods);
                foreach (var post in postDTO)
                {
                    post.PostType = "food";
                }
                return Ok(postDTO);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database:" + e.Message);
            }
        }


        // [HttpGet]
        // public async Task<ActionResult> GetAllUsers()
        // {
        //     try
        //     {
        //         var users = await _userRepository.GetAllAsync();
        //         return Ok(users);
        //     }
        //     catch (Exception)
        //     {
        //         return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
        //     }
        // }
    }
}
