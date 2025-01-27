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
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientRepository _ingredientRepository;
        private readonly IMapper _mapper;

        public IngredientController(IIngredientRepository ingredientRepository, IMapper mapper)
        {
            _ingredientRepository = ingredientRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllIngredients")]
        public async Task<ActionResult> GetAllIngredients()
        {
            try
            {
                var ingredients = await _ingredientRepository.GetAllAsync();
                return Ok(_mapper.Map<List<IngredientDTO>>(ingredients));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpGet("GetAllApprovedIngredients")]
        public async Task<ActionResult> GetAllApprovedIngredients()
        {
            try
            {
                var ingredients = await _ingredientRepository.GetApprovedIngredients();
                return Ok(_mapper.Map<List<IngredientDTO>>(ingredients));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        [HttpPost("AddIngredient")]
        public async Task<ActionResult> AddIngredient(AddIngreRequestDTO requestDTO)
        {
            try
            {
                var ingredientDomain = _mapper.Map<Ingredient>(requestDTO);
                ingredientDomain.IsApproved = false;
                var ingredient = await _ingredientRepository.CreateAsync(ingredientDomain);
                return Ok(_mapper.Map<IngredientDTO>(ingredient));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding data to the database");
            }
        }

    }
}
