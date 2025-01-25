using AutoMapper;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        private readonly IUserDetailRepository _userDetailRepository;

        private readonly IUserNotificationPreferenceRepository _userNotificationPreferenceRepository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepository, IMapper mapper, IUserDetailRepository userDetailRepository, IUserNotificationPreferenceRepository userNotificationPreferenceRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userDetailRepository = userDetailRepository;
            _userNotificationPreferenceRepository = userNotificationPreferenceRepository;
        }


        [HttpGet]
        public async Task<ActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userRepository.GetAllAsync();
                return Ok(_mapper.Map<List<UserProfileInfoDTO>>(users));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        #region Get User By Id
        [HttpGet("GetUserById/{userId}")]
        public async Task<ActionResult> GetUserById(int userId)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(userId);
                if (user == null)
                {
                    return BadRequest(new { error = "User not found" });
                }
                return Ok(_mapper.Map<UserProfileInfoDTO>(user));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database: " + e.Message);
            }
        }

        [HttpGet("GetUserDetailById/{userId}")]
        public async Task<ActionResult> GetUserDetailById(int userId)
        {
            try
            {
                var userDetail = await _userDetailRepository.GetUserDetailByUserIdAsync(userId);
                if (userDetail == null)
                {
                    return BadRequest(new { error = "User detail not found" });
                }
                return Ok(_mapper.Map<UserDetailDTO>(userDetail));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database: " + e.Message);
            }
        }

        [HttpGet("GetUserNotificationPreferenceById/{userId}")]
        public async Task<ActionResult> GetUserNotificationPreferenceById(int userId)
        {
            try
            {
                var userNotificationPreference = await _userNotificationPreferenceRepository.GetUserNotificationPreferenceByUserIdAsync(userId);
                if (userNotificationPreference == null)
                {
                    return BadRequest(new { error = "User notification preference not found" });
                }
                return Ok(_mapper.Map<UserNotiPrefDTO>(userNotificationPreference));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database: " + e.Message);
            }
        }
        #endregion

    }
}
