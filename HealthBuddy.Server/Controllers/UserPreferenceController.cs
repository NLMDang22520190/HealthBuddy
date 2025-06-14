using AutoMapper;
using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Models.DTO.ADD;
using HealthBuddy.Server.Models.DTO.UPDATE;
using HealthBuddy.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPreferenceController : ControllerBase
    {
        private readonly IUserPreferenceRepository _userPreferenceRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserPreferenceController(
            IUserPreferenceRepository userPreferenceRepository,
            IUserRepository userRepository,
            IMapper mapper)
        {
            _userPreferenceRepository = userPreferenceRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Get user preferences by user ID
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <returns>User preferences</returns>
        [HttpGet("{userId}")]
        public async Task<ActionResult<UserPreferenceDTO>> GetUserPreference(int userId)
        {
            try
            {
                var userPreference = await _userPreferenceRepository.GetUserPreferenceByUserIdAsync(userId);
                
                if (userPreference == null)
                {
                    return NotFound($"User preferences not found for user ID: {userId}");
                }

                var userPreferenceDTO = _mapper.Map<UserPreferenceDTO>(userPreference);
                return Ok(userPreferenceDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Error retrieving user preferences: {ex.Message}");
            }
        }

        /// <summary>
        /// Create or update user preferences
        /// </summary>
        /// <param name="userPreferenceRequest">User preference data</param>
        /// <returns>Created/updated user preferences</returns>
        [HttpPost]
        public async Task<ActionResult<UserPreferenceDTO>> CreateOrUpdateUserPreference([FromBody] AddUserPreferenceRequestDTO userPreferenceRequest)
        {
            try
            {
                // Validate user exists
                var user = await _userRepository.GetUserByIdAsync(userPreferenceRequest.UserId);
                if (user == null)
                {
                    return BadRequest($"User not found with ID: {userPreferenceRequest.UserId}");
                }

                var userPreference = _mapper.Map<UserPreference>(userPreferenceRequest);
                var result = await _userPreferenceRepository.CreateOrUpdateUserPreferenceAsync(userPreference);

                var userPreferenceDTO = _mapper.Map<UserPreferenceDTO>(result);
                return Ok(userPreferenceDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Error creating/updating user preferences: {ex.Message}");
            }
        }

        /// <summary>
        /// Update specific user preference fields
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <param name="updateRequest">Fields to update</param>
        /// <returns>Updated user preferences</returns>
        [HttpPut("{userId}")]
        public async Task<ActionResult<UserPreferenceDTO>> UpdateUserPreference(int userId, [FromBody] UpdateUserPreferenceRequestDTO updateRequest)
        {
            try
            {
                var existingPreference = await _userPreferenceRepository.GetUserPreferenceByUserIdAsync(userId);
                if (existingPreference == null)
                {
                    return NotFound($"User preferences not found for user ID: {userId}");
                }

                // Update only provided fields
                if (updateRequest.DietaryRestrictions != null)
                    existingPreference.DietaryRestrictions = updateRequest.DietaryRestrictions;
                
                if (updateRequest.PreferredCuisines != null)
                    existingPreference.PreferredCuisines = updateRequest.PreferredCuisines;
                
                if (updateRequest.DislikedIngredients != null)
                    existingPreference.DislikedIngredients = updateRequest.DislikedIngredients;
                
                if (updateRequest.MaxCookingTime.HasValue)
                    existingPreference.MaxCookingTime = updateRequest.MaxCookingTime;
                
                if (updateRequest.PreferredDifficultyLevel != null)
                    existingPreference.PreferredDifficultyLevel = updateRequest.PreferredDifficultyLevel;
                
                if (updateRequest.TargetCaloriesPerMeal.HasValue)
                    existingPreference.TargetCaloriesPerMeal = updateRequest.TargetCaloriesPerMeal;
                
                if (updateRequest.PreferredExerciseTypes != null)
                    existingPreference.PreferredExerciseTypes = updateRequest.PreferredExerciseTypes;
                
                if (updateRequest.PreferredMuscleGroups != null)
                    existingPreference.PreferredMuscleGroups = updateRequest.PreferredMuscleGroups;
                
                if (updateRequest.MaxWorkoutDuration.HasValue)
                    existingPreference.MaxWorkoutDuration = updateRequest.MaxWorkoutDuration;
                
                if (updateRequest.FitnessGoals != null)
                    existingPreference.FitnessGoals = updateRequest.FitnessGoals;
                
                if (updateRequest.PreferredWorkoutTime != null)
                    existingPreference.PreferredWorkoutTime = updateRequest.PreferredWorkoutTime;
                
                if (updateRequest.FitnessLevel.HasValue)
                    existingPreference.FitnessLevel = updateRequest.FitnessLevel;
                
                if (updateRequest.TargetWeight.HasValue)
                    existingPreference.TargetWeight = updateRequest.TargetWeight;
                
                if (updateRequest.TargetCaloriesPerDay.HasValue)
                    existingPreference.TargetCaloriesPerDay = updateRequest.TargetCaloriesPerDay;
                
                if (updateRequest.HealthGoals != null)
                    existingPreference.HealthGoals = updateRequest.HealthGoals;
                
                if (updateRequest.ActivityLevel != null)
                    existingPreference.ActivityLevel = updateRequest.ActivityLevel;

                existingPreference.UpdatedDate = DateTime.Now;

                var result = await _userPreferenceRepository.CreateOrUpdateUserPreferenceAsync(existingPreference);

                var userPreferenceDTO = _mapper.Map<UserPreferenceDTO>(result);
                return Ok(userPreferenceDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Error updating user preferences: {ex.Message}");
            }
        }

        /// <summary>
        /// Delete user preferences
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <returns>Success status</returns>
        [HttpDelete("{userId}")]
        public async Task<ActionResult> DeleteUserPreference(int userId)
        {
            try
            {
                var userPreference = await _userPreferenceRepository.GetUserPreferenceByUserIdAsync(userId);
                if (userPreference == null)
                {
                    return NotFound($"User preferences not found for user ID: {userId}");
                }

                await _userPreferenceRepository.DeleteAsync(up => up.UserPreferenceId == userPreference.UserPreferenceId);
                return Ok(new { message = "User preferences deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Error deleting user preferences: {ex.Message}");
            }
        }

        /// <summary>
        /// Get users with similar health goals
        /// </summary>
        /// <param name="healthGoals">Health goals to match</param>
        /// <returns>List of users with similar goals</returns>
        [HttpGet("similar-goals")]
        public async Task<ActionResult<List<UserPreferenceDTO>>> GetUsersByHealthGoals([FromQuery] string healthGoals)
        {
            try
            {
                if (string.IsNullOrEmpty(healthGoals))
                {
                    return BadRequest("Health goals parameter is required");
                }

                var userPreferences = await _userPreferenceRepository.GetUserPreferencesByHealthGoalsAsync(healthGoals);
                var userPreferenceDTOs = _mapper.Map<List<UserPreferenceDTO>>(userPreferences);
                
                return Ok(userPreferenceDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Error retrieving users by health goals: {ex.Message}");
            }
        }

        /// <summary>
        /// Get users by activity level
        /// </summary>
        /// <param name="activityLevel">Activity level to match</param>
        /// <returns>List of users with similar activity level</returns>
        [HttpGet("activity-level")]
        public async Task<ActionResult<List<UserPreferenceDTO>>> GetUsersByActivityLevel([FromQuery] string activityLevel)
        {
            try
            {
                if (string.IsNullOrEmpty(activityLevel))
                {
                    return BadRequest("Activity level parameter is required");
                }

                var userPreferences = await _userPreferenceRepository.GetUserPreferencesByActivityLevelAsync(activityLevel);
                var userPreferenceDTOs = _mapper.Map<List<UserPreferenceDTO>>(userPreferences);
                
                return Ok(userPreferenceDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Error retrieving users by activity level: {ex.Message}");
            }
        }
    }
}
