using AutoMapper;
using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Models.DTO.ADD;
using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController : ControllerBase
    {
        private readonly IMealScheduleRepository _mealScheduleRepository;

        private readonly IMealDetailRepository _mealDetailRepository;

        private readonly IMapper _mapper;

        public MealController(IMealScheduleRepository mealScheduleRepository, IMealDetailRepository mealDetailRepository, IMapper mapper)
        {
            _mealScheduleRepository = mealScheduleRepository;
            _mealDetailRepository = mealDetailRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllMealSchedules")]
        public async Task<ActionResult> GetAllMealSchedules()
        {
            try
            {
                var mealSchedules = await _mealScheduleRepository.GetAllAsync();
                return Ok(_mapper.Map<List<MealScheduleDTO>>(mealSchedules));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpGet("GetMealScheduleById/{mealId}")]
        public async Task<ActionResult> GetMealScheduleById(int mealId)
        {
            try
            {
                var mealSchedule = await _mealScheduleRepository.GetMealScheduleByIdAsync(mealId);
                if (mealSchedule == null)
                {
                    return NotFound($"Meal schedule with ID {mealId} not found.");
                }
                return Ok(_mapper.Map<MealScheduleDTO>(mealSchedule));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database: " + e.Message);
            }
        }

        [HttpPost("AddMealSchedule")]
        public async Task<ActionResult> AddMealSchedule(AddMealScheduleRequestDTO requestDTO)
        {
            try
            {
                var domain = _mapper.Map<MealSchedule>(requestDTO);

                domain.IsApproved = false;
                domain.IsHidden = false;
                domain.NumberOfComments = 0;
                domain.NumberOfLikes = 0;
                domain.CreatedDate = DateTime.Now;
                domain.UpdatedDate = DateTime.Now;
                var createdMealSchedule = await _mealScheduleRepository.CreateAsync(domain);

                return Ok(_mapper.Map<MealScheduleDTO>(createdMealSchedule));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding data to the database: " + e.Message);
            }
        }

        [HttpPut("ApproveMealSchedule/{mealId}")]
        public async Task<ActionResult> ApproveMealSchedule(int mealId)
        {
            try
            {
                var updatedMeal = await _mealScheduleRepository.ApproveMealScheduleAsync(mealId);
                if (updatedMeal == null)
                {
                    return NotFound($"Meal schedule with ID {mealId} not found.");
                }
                return Ok(_mapper.Map<MealScheduleDTO>(updatedMeal));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data in the database: " + e.Message);
            }
        }


    }

}
