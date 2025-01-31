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
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseRepository _exerciseRepository;
        private readonly IExerciseTypeRepository _exerciseTypeRepository;

        private readonly IMuscleTypeRepository _muscleTypeRepository;
        private readonly IMapper _mapper;

        public ExerciseController(IExerciseRepository exerciseRepository, IMapper mapper, IExerciseTypeRepository exerciseTypeRepository, IMuscleTypeRepository muscleTypeRepository)
        {
            _exerciseRepository = exerciseRepository;
            _mapper = mapper;
            _exerciseTypeRepository = exerciseTypeRepository;
            _muscleTypeRepository = muscleTypeRepository;
        }

        [HttpGet("GetExerciseById/{exerciseId}")]
        public async Task<ActionResult> GetExerciseById(int exerciseId)
        {
            try
            {
                var exercise = await _exerciseRepository.GetExerciseById(exerciseId);
                if (exercise == null)
                {
                    return BadRequest(new { error = "Exercise not found" });
                }
                return Ok(_mapper.Map<ExerciseDTO>(exercise));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database: " + e.Message);
            }
        }

        [HttpPost("AddNewExercise")]
        public async Task<ActionResult> AddExercise(AddExerciseRequestDTO exerciseDTO)
        {
            try
            {
                var exerciseDomain = _mapper.Map<Exercise>(exerciseDTO);
                foreach (var exerciseType in exerciseDTO.ExerciseTypeIds)
                {
                    var exerciseTypeDomain = await _exerciseTypeRepository.GetExerciseTypeById(exerciseType);
                    if (exerciseTypeDomain != null)
                    {
                        exerciseDomain.ExerciseTypes.Add(exerciseTypeDomain);
                    }
                }
                foreach (var muscleType in exerciseDTO.MuscleTypeIds)
                {
                    var muscleTypeDomain = await _muscleTypeRepository.GetMuscleTypeById(muscleType);
                    if (muscleTypeDomain != null)
                    {
                        exerciseDomain.MuscleTypes.Add(muscleTypeDomain);
                    }
                }
                exerciseDomain.IsApproved = false;
                exerciseDomain.IsHidden = false;
                exerciseDomain.NumberOfComments = 0;
                exerciseDomain.NumberOfLikes = 0;
                exerciseDomain.CreatedDate = DateTime.Now;
                exerciseDomain.UpdatedDate = DateTime.Now;

                var createdExerciseDomain = await _exerciseRepository.CreateAsync(exerciseDomain);
                if (createdExerciseDomain == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Error adding exercise to the database");
                }
                return Ok(_mapper.Map<ExerciseDTO>(createdExerciseDomain));

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding data to the database: " + e.Message);
            }
        }

        [HttpPut("ApproveExercise/{exerciseId}")]
        public async Task<ActionResult> ApproveExercise(int exerciseId)
        {
            try
            {
                var updateExercise = await _exerciseRepository.ApproveExercise(exerciseId);
                if (updateExercise == null)
                {
                    return NotFound("Exercise not found");
                }
                return Ok(_mapper.Map<ExerciseDTO>(updateExercise));


            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error approving exercise: " + e.Message);
            }
        }


    }
}
