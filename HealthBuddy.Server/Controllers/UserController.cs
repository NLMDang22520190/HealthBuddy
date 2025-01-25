using AutoMapper;
using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Models.DTO.UPDATE;
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

        #region Update User By Id
        [HttpPut("UpdateUser")]
        public async Task<ActionResult> UpdateUserById(UpdateUserRequestDTO requestDTO)
        {
            try
            {
                var user = _mapper.Map<User>(requestDTO);

                var updateUser = await _userRepository.UpdateAsync(u => u.UserId == requestDTO.UserId, existingRecord =>
                {
                    existingRecord.Username = user.Username;
                    existingRecord.Avatar = user.Avatar;
                });

                if (updateUser == null)
                {
                    return BadRequest(new { error = "User not found" });
                }
                //return Ok(_mapper.Map<UserProfileInfoDTO>(updateUser));
                return Ok("User updated successfully");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data from the database: " + e.Message);
            }
        }

        [HttpPut("UpdateUserDetail")]
        public async Task<ActionResult> UpdateUserDetailById(UpdateUserDetailRequestDTO requestDTO)
        {
            try
            {

                var userDetail = _mapper.Map<UserDetail>(requestDTO);

                var updateUserDetail = await _userDetailRepository.UpdateAsync(ud => ud.UserId == requestDTO.UserId, existingRecord =>
                {
                    existingRecord.Height = userDetail.Height;
                    existingRecord.Weight = userDetail.Weight;
                    existingRecord.HealthCondition = userDetail.HealthCondition;
                    existingRecord.Allergies = userDetail.Allergies;
                });

                if (updateUserDetail == null)
                {
                    return BadRequest(new { error = "User detail not found" });
                }
                //return Ok(_mapper.Map<UserDetailDTO>(updateUserDetail));
                return Ok("User detail updated successfully");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data from the database: " + e.Message);
            }
        }

        [HttpPut("UpdateUserNotificationPreference")]
        public async Task<ActionResult> UpdateUserNotificationPreferenceById(UpdateUserNotiPrefRequestDTO requestDTO)
        {
            try
            {
                var userNotificationPreference = _mapper.Map<UserNotificationPreference>(requestDTO);

                var updateUserNotificationPreference = await _userNotificationPreferenceRepository.UpdateAsync(unp => unp.UserId == requestDTO.UserId, existingRecord =>
                {
                    existingRecord.FoodNoti = userNotificationPreference.FoodNoti;
                    existingRecord.ExerciseNoti = userNotificationPreference.ExerciseNoti;
                    existingRecord.WorkoutScheduleNoti = userNotificationPreference.WorkoutScheduleNoti;
                    existingRecord.MealScheduleNoti = userNotificationPreference.MealScheduleNoti;
                });

                if (updateUserNotificationPreference == null)
                {
                    return BadRequest(new { error = "User notification preference not found" });
                }
                //return Ok(_mapper.Map<UserNotiPrefDTO>(updateUserNotificationPreference));
                return Ok("User notification preference updated successfully");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data from the database: " + e.Message);
            }
        }

        #endregion
    }
}
