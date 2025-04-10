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
        private readonly IFoodRepository _foodRepository;
        private readonly IExerciseRepository _exerciseRepository;
        private readonly IWorkoutScheduleRepository _workoutScheduleRepository;
        private readonly IMealScheduleRepository _mealScheduleRepository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepository,
        IMapper mapper,
        IUserDetailRepository userDetailRepository,
        IUserNotificationPreferenceRepository userNotificationPreferenceRepository,
        IFoodRepository foodRepository,
        IExerciseRepository exerciseRepository,
        IWorkoutScheduleRepository workoutScheduleRepository,
        IMealScheduleRepository mealScheduleRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userDetailRepository = userDetailRepository;
            _userNotificationPreferenceRepository = userNotificationPreferenceRepository;
            _foodRepository = foodRepository;
            _exerciseRepository = exerciseRepository;
            _workoutScheduleRepository = workoutScheduleRepository;
            _mealScheduleRepository = mealScheduleRepository;
        }


        [HttpGet]
        public async Task<ActionResult> GetAllUsers()
        {
            try
            {
                // 1. Lấy tất cả người dùng một lần
                var users = await _userRepository.GetAllAsync();
                var userProfiles = _mapper.Map<List<UserProfileInfoDTO>>(users);
                var userIds = userProfiles.Select(u => u.UserId).ToList();

                // 2. Truy vấn tất cả tổng số bài viết theo UserId một lần
                var foodCountsTask = _foodRepository.GetTotalFoodsByUserIds(userIds);
                var exerciseCountsTask = _exerciseRepository.GetTotalExercisesByUserIds(userIds);
                var workoutScheduleCountsTask = _workoutScheduleRepository.GetTotalWorkoutsByUserIds(userIds);
                var mealScheduleCountsTask = _mealScheduleRepository.GetTotalMealsByUserIds(userIds);
                await Task.WhenAll(foodCountsTask, exerciseCountsTask, workoutScheduleCountsTask, mealScheduleCountsTask);

                var foodCounts = await foodCountsTask;
                var exerciseCounts = await exerciseCountsTask;
                var workoutScheduleCounts = await workoutScheduleCountsTask;
                var mealScheduleCounts = await mealScheduleCountsTask;

                // 3. Gán số lượng bài viết vào userProfiles
                foreach (var u in userProfiles)
                {
                    u.NumberOfFoodPosts = foodCounts.TryGetValue(u.UserId, out var foodCount) ? foodCount : 0;
                    u.NumberOfExercisePosts = exerciseCounts.TryGetValue(u.UserId, out var exerciseCount) ? exerciseCount : 0;
                    u.NumberOfWorkoutPosts = workoutScheduleCounts.TryGetValue(u.UserId, out var workoutCount) ? workoutCount : 0;
                    u.NumberOfMealPosts = mealScheduleCounts.TryGetValue(u.UserId, out var mealCount) ? mealCount : 0;
                }

                return Ok(userProfiles);
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
                var userProfile = _mapper.Map<UserProfileInfoDTO>(user);

                var foodTask = _foodRepository.GetTotalFoodsByUserId(userId);
                var exerciseTask = _exerciseRepository.GetTotalExercisesByUserId(userId);
                var workoutScheduleTask = _workoutScheduleRepository.GetTotalWorkoutsByUserId(userId);
                var mealScheduleTask = _mealScheduleRepository.GetTotalMealsByUserId(userId);
                await Task.WhenAll(foodTask, exerciseTask, workoutScheduleTask, mealScheduleTask);

                userProfile.NumberOfFoodPosts = await foodTask;
                userProfile.NumberOfExercisePosts = await exerciseTask;
                userProfile.NumberOfWorkoutPosts = await workoutScheduleTask;
                userProfile.NumberOfMealPosts = await mealScheduleTask;

                return Ok(userProfile);
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
