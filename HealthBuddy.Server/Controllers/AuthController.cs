using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.AUTH;
using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly SuperTokensService _superTokensService;

        public AuthController(IUserRepository userRepository, SuperTokensService superTokensService)
        {
            _userRepository = userRepository;
            _superTokensService = superTokensService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpRequestDTO request)
        {
            var userId = await _superTokensService.SignUpUser(request.Email, request.Password);
            var result = await _userRepository.CreateUserAsync(request.Email, request.Password);
            if (!result)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating user");
            }
            return Ok("User created successfully");
        }

        // [HttpGet]
        // public async Task<ActionResult> GetAllUsers()
        // {
        //     try
        //     {
        //         var users = await _userRepository.GetAllAsync();
        //         return Ok(users);
        //     }
        //     catch (Exception)
        //     {
        //         return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
        //     }
        // }
    }
}
