using System.Diagnostics;
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
    public class FoodController : ControllerBase
    {
        private readonly IFoodRepository _foodRepository;
        private readonly IFoodTypeRepository _foodTypeRepository;

        private readonly IMapper _mapper;

        public FoodController(IFoodRepository foodRepository, IFoodTypeRepository foodTypeRepository, IMapper mapper)
        {
            _foodRepository = foodRepository;
            _foodTypeRepository = foodTypeRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllFoods")]
        public async Task<ActionResult> GetAllFoods()
        {
            try
            {
                var foods = await _foodRepository.GetAllAsync();
                return Ok(_mapper.Map<List<AddFoodRequestDTO>>(foods));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpGet("GetFoodById/{foodId}")]
        public async Task<ActionResult> GetFoodById(int foodId)
        {
            try
            {
                var food = await _foodRepository.GetFoodById(foodId);
                if (food == null)
                {
                    return BadRequest(new { error = "Food not found" });
                }
                return Ok(_mapper.Map<FoodDTO>(food));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database: " + e.Message);
            }
        }

        [HttpPost("AddNewFood")]
        public async Task<ActionResult> AddFood(AddFoodRequestDTO foodDTO)
        {
            try
            {
                var foodDomain = _mapper.Map<Food>(foodDTO);
                foreach (var foodType in foodDTO.FoodTypeIds)
                {
                    var foodTypeDomain = await _foodTypeRepository.GetFoodTypeById(foodType);
                    if (foodTypeDomain != null)
                    {
                        foodDomain.FoodTypes.Add(foodTypeDomain);
                    }
                }

                foodDomain.IsApproved = false;
                foodDomain.IsHidden = false;
                foodDomain.NumberOfComments = 0;
                foodDomain.NumberOfLikes = 0;
                foodDomain.CreatedDate = DateTime.Now;
                foodDomain.UpdatedDate = DateTime.Now;

                var createdFoodDomain = await _foodRepository.CreateAsync(foodDomain);
                if (createdFoodDomain == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Error adding food to the database");
                }
                return Ok(_mapper.Map<FoodDTO>(createdFoodDomain));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding food to the database" + e.Message);
            }
        }

        [HttpPut("ApproveFood/{foodId}")]
        public async Task<ActionResult> ApproveFood(int foodId)
        {
            try
            {

                var updatedFood = await _foodRepository.ApproveFood(foodId);
                if (updatedFood == null)
                {
                    return NotFound("Food not found");
                }

                return Ok(_mapper.Map<FoodDTO>(updatedFood));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error approving food in the database: " + e.Message);
            }
        }
    }
}
