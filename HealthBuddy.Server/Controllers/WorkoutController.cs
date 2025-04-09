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
        private readonly IMapper _mapper;

        public WorkoutController(IWorkoutScheduleRepository workoutScheduleRepository, IWorkoutDetailRepository workoutDetailRepository, IMapper mapper)
        {
            _workoutScheduleRepository = workoutScheduleRepository;
            _workoutDetailRepository = workoutDetailRepository;
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


    }
}
