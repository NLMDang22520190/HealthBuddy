using AutoMapper;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IWorkoutScheduleRepository _workoutScheduleRepository;

        private readonly IMealScheduleRepository _mealScheduleRepository;

        private readonly IWorkoutDetailRepository _workoutDetailRepository;

        private readonly IMealDetailRepository _mealDetailRepository;

        private readonly IUserWorkoutScheduleRepository _userWorkoutScheduleRepository;

        private readonly IUserMealScheduleRepository _userMealScheduleRepository;

        private readonly IUserWorkoutTrackingRepository _userWorkoutTrackingRepository;

        private readonly IUserMealTrackingRepository _userMealTrackingRepository;

        private readonly IMapper _mapper;

        public ScheduleController(IWorkoutScheduleRepository workoutScheduleRepository,
            IMealScheduleRepository mealScheduleRepository, IWorkoutDetailRepository workoutDetailRepository,
            IMealDetailRepository mealDetailRepository, IUserWorkoutScheduleRepository userWorkoutScheduleRepository,
            IUserMealScheduleRepository userMealScheduleRepository, IUserWorkoutTrackingRepository userWorkoutTrackingRepository,
            IUserMealTrackingRepository userMealTrackingRepository, IMapper mapper)
        {
            _workoutScheduleRepository = workoutScheduleRepository;
            _mealScheduleRepository = mealScheduleRepository;
            _workoutDetailRepository = workoutDetailRepository;
            _mealDetailRepository = mealDetailRepository;
            _userWorkoutScheduleRepository = userWorkoutScheduleRepository;
            _userMealScheduleRepository = userMealScheduleRepository;
            _userWorkoutTrackingRepository = userWorkoutTrackingRepository;
            _userMealTrackingRepository = userMealTrackingRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllSchedules")]
        public async Task<ActionResult> GetAllSchedules()
        {
            try
            {
                var workoutScheduleTask = _workoutScheduleRepository.GetApprovedWorkoutSchedules();
                var mealScheduleTask = _mealScheduleRepository.GetApprovedMealSchedules();

                await Task.WhenAll(workoutScheduleTask, mealScheduleTask);

                // Lấy kết quả từ các task
                var workoutSchedules = await workoutScheduleTask;
                var mealSchedules = await mealScheduleTask;

                // Map từ Food và Exercise sang PostDTO
                var workoutSchedulePosts = _mapper.Map<List<PostDTO>>(workoutSchedules);
                var mealSchedulePosts = _mapper.Map<List<PostDTO>>(mealSchedules);

                // Gán loại bài post (food hoặc exercise)
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
