using System.Diagnostics;
using AutoMapper;
using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.ADD;
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

                var createdFoodDomain = await _foodRepository.CreateAsync(foodDomain);
                if (createdFoodDomain == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Error adding food to the database");
                }
                return Ok(_mapper.Map<AddFoodRequestDTO>(createdFoodDomain));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding food to the database" + e.Message);
            }
        }
    }
}
