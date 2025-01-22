using System.Text.Json;
using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.AUTH;
using HealthBuddy.Server.Repositories;
using HealthBuddy.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly Auth0Service _auth0Service;

        public AuthController(IUserRepository userRepository, Auth0Service auth0Service)
        {
            _userRepository = userRepository;
            _auth0Service = auth0Service;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            try
            {
                var response = await _auth0Service.LoginAsync(request.Email, request.Password);
                return Ok(JsonSerializer.Deserialize<object>(response));
            }
            catch (HttpRequestException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpRequestDTO request)
        {
            try
            {
                var response = await _auth0Service.SignupAsync(request.Email, request.Password);

                // var result = await _userRepository.CreateUserAsync(request.Email, request.Password);
                // if (!result)
                // {
                //     return StatusCode(StatusCodes.Status500InternalServerError, "Error creating user");
                // }

                return Ok(JsonSerializer.Deserialize<object>(response));
            }
            catch (HttpRequestException ex)
            {
                return BadRequest(new { error = ex.Message });
            }

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
