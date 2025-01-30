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
    public class ExerciseTypeController : ControllerBase
    {
        private readonly IExerciseTypeRepository _IExerciseTypeRepository;
        private readonly IMapper _mapper;

        public ExerciseTypeController(IExerciseTypeRepository exerciseTypeRepository, IMapper mapper)
        {
            _IExerciseTypeRepository = exerciseTypeRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllExerciseTypes")]
        public async Task<ActionResult> GetAllExerciseTypes()
        {
            try
            {
                var types = await _IExerciseTypeRepository.GetAllAsync();
                return Ok(_mapper.Map<List<ExerciseTypeDTO>>(types));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpGet("GetAllApprovedExerciseTypes")]
        public async Task<ActionResult> GetAllApprovedExerciseTypes()
        {
            try
            {
                var types = await _IExerciseTypeRepository.GetApprovedExerciseTypes();
                return Ok(_mapper.Map<List<ExerciseTypeDTO>>(types));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpPost("AddExerciseType")]
        public async Task<ActionResult> AddExerciseType(AddExerciseTypeRequestDTO requestDTO)
        {
            try
            {
                var exerciseTypeDomain = _mapper.Map<ExerciseType>(requestDTO);
                exerciseTypeDomain.IsApproved = false;
                var type = await _IExerciseTypeRepository.CreateAsync(exerciseTypeDomain);
                return Ok(_mapper.Map<ExerciseTypeDTO>(type));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding data to the database");
            }
        }
    }
}
