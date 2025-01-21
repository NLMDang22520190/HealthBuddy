using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public TemplateController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
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
