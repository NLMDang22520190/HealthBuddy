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
    public class MuscleTypeController : ControllerBase
    {
        private readonly IMuscleTypeRepository _muscleTypeRepository;
        private readonly IMapper _mapper;

        public MuscleTypeController(IMuscleTypeRepository muscleTypeRepository, IMapper mapper)
        {
            _muscleTypeRepository = muscleTypeRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllMuscleTypes")]
        public async Task<ActionResult> GetAllMuscleTypes()
        {
            try
            {
                var types = await _muscleTypeRepository.GetAllAsync();
                return Ok(_mapper.Map<List<MuscleTypeDTO>>(types));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpGet("GetAllApprovedMuscleTypes")]
        public async Task<ActionResult> GetAllApprovedMuscleTypes()
        {
            try
            {
                var types = await _muscleTypeRepository.GetApprovedMuscleTypes();
                return Ok(_mapper.Map<List<MuscleTypeDTO>>(types));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpPost("AddMuscleType")]
        public async Task<ActionResult> AddMuscleType(AddMuscleTypeRequestDTO requestDTO)
        {
            try
            {
                var muscleTypeDomain = _mapper.Map<MuscleType>(requestDTO);
                muscleTypeDomain.IsApproved = false;
                var type = await _muscleTypeRepository.CreateAsync(muscleTypeDomain);
                return Ok(_mapper.Map<MuscleTypeDTO>(type));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding data to the database");
            }
        }
    }
}
