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
    public class FoodTypeController : ControllerBase
    {
        private readonly IFoodTypeRepository _foodTypeRepository;
        private readonly IMapper _mapper;

        public FoodTypeController(IFoodTypeRepository foodTypeRepository, IMapper mapper)
        {
            _foodTypeRepository = foodTypeRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllFoodTypes")]
        public async Task<ActionResult> GetAllFoodTypes()
        {
            try
            {
                var foodTypes = await _foodTypeRepository.GetAllAsync();
                return Ok(_mapper.Map<List<FoodTypeDTO>>(foodTypes));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpGet("GetAllApprovedFoodTypes")]
        public async Task<ActionResult> GetAllApprovedFoodTypes()
        {
            try
            {
                var foodTypes = await _foodTypeRepository.GetApprovedFoodTypes();
                return Ok(_mapper.Map<List<FoodTypeDTO>>(foodTypes));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }



        [HttpPost("AddFoodType")]
        public async Task<ActionResult> AddFoodType(AddFoodTypeRequestDTO requestDTO)
        {
            try
            {
                var foodTypeDomain = _mapper.Map<FoodType>(requestDTO);
                foodTypeDomain.IsApproved = false;
                var foodType = await _foodTypeRepository.CreateAsync(foodTypeDomain);
                return Ok(_mapper.Map<FoodTypeDTO>(foodType));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding data to the database");
            }
        }

    }
}
