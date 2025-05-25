using AutoMapper;
using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.ADD;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly IWorkoutScheduleRepository _workoutScheduleRepository;
        private readonly IWorkoutDetailRepository _workoutDetailRepository;
        private readonly IUserWorkoutTrackingRepository _userWorkoutTrackingRepository;
        private readonly IUserWorkoutScheduleRepository _userWorkoutScheduleRepository;
        private readonly IMapper _mapper;

        public WorkoutController(IWorkoutScheduleRepository workoutScheduleRepository, IWorkoutDetailRepository workoutDetailRepository,
            IUserWorkoutTrackingRepository userWorkoutTrackingRepository, IUserWorkoutScheduleRepository userWorkoutScheduleRepository, IMapper mapper)
        {
            _workoutScheduleRepository = workoutScheduleRepository;
            _workoutDetailRepository = workoutDetailRepository;
            _userWorkoutTrackingRepository = userWorkoutTrackingRepository;
            _userWorkoutScheduleRepository = userWorkoutScheduleRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllWorkoutSchedules")]
        public async Task<ActionResult> GetAllWorkoutSchedules()
        {
            try
            {
                var workoutSchedules = await _workoutScheduleRepository.GetAllAsync();
                return Ok(_mapper.Map<List<WorkoutScheduleDTO>>(workoutSchedules));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpGet("GetWorkoutScheduleById/{workoutId}")]
        public async Task<ActionResult> GetWorkoutScheduleById(int workoutId)
        {
            try
            {
                var workoutSchedule = await _workoutScheduleRepository.GetWorkoutScheduleByIdAsync(workoutId);
                if (workoutSchedule == null)
                {
                    return NotFound($"Workout schedule with ID {workoutId} not found.");
                }
                return Ok(_mapper.Map<WorkoutScheduleDTO>(workoutSchedule));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database: " + e.Message);
            }
        }

        [HttpPost("AddWorkoutSchedule")]
        public async Task<ActionResult> AddMealSchedule(AddWorkoutScheduleRequestDTO requestDTO)
        {
            try
            {
                var domain = _mapper.Map<WorkoutSchedule>(requestDTO);

                domain.IsApproved = false;
                domain.IsHidden = false;
                domain.NumberOfComments = 0;
                domain.NumberOfLikes = 0;
                domain.CreatedDate = DateTime.Now;
                domain.UpdatedDate = DateTime.Now;
                var createdSchedule = await _workoutScheduleRepository.CreateAsync(domain);

                return Ok(_mapper.Map<WorkoutScheduleDTO>(createdSchedule));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding data to the database: " + e.Message);
            }
        }

        [HttpPut("ApproveWorkoutSchedule/{id}")]
        public async Task<ActionResult> ApproveWorkoutSchedule(int id)
        {
            try
            {
                var workoutSchedule = await _workoutScheduleRepository.ApproveWorkoutScheduleAsync(id);
                if (workoutSchedule == null)
                {
                    return NotFound($"Workout schedule with ID {id} not found.");
                }
                return Ok(_mapper.Map<WorkoutScheduleDTO>(workoutSchedule));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error approving data in the database: " + e.Message);
            }
        }

        [HttpPost("FollowWorkoutSchedule")]
        public async Task<ActionResult> FollowWorkoutSchedule(FollowWorkoutScheduleRequestDTO requestDTO)
        {
            try
            {
                // Kiểm tra workout schedule có tồn tại không
                var workoutSchedule = await _workoutScheduleRepository.GetWorkoutScheduleByIdAsync(requestDTO.WorkoutScheduleId);
                if (workoutSchedule == null)
                {
                    return NotFound($"Workout schedule with ID {requestDTO.WorkoutScheduleId} not found.");
                }

                // Tạo UserWorkoutTracking record
                var userWorkoutTracking = _mapper.Map<UserWorkoutTracking>(requestDTO);
                var createdTracking = await _userWorkoutTrackingRepository.CreateAsync(userWorkoutTracking);

                // Tự động tạo các UserWorkoutSchedule records dựa trên TotalDays
                for (int day = 1; day <= workoutSchedule.TotalDays; day++)
                {
                    var userWorkoutSchedule = new UserWorkoutSchedule
                    {
                        UserId = requestDTO.UserId,
                        WorkoutScheduleId = requestDTO.WorkoutScheduleId,
                        DayNumber = day,
                        IsCompleted = false,
                        CompletionDate = null
                    };

                    await _userWorkoutScheduleRepository.CreateAsync(userWorkoutSchedule);
                }

                return Ok(new {
                    Message = "Successfully followed workout schedule",
                    TrackingId = createdTracking.UserWorkoutTrackingId,
                    TotalDays = workoutSchedule.TotalDays
                });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error following workout schedule: " + e.Message);
            }
        }

    }
}
