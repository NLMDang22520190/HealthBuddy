using AutoMapper;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationController : ControllerBase
    {
        private readonly IRecommendationService _recommendationService;
        private readonly IMapper _mapper;

        public RecommendationController(IRecommendationService recommendationService, IMapper mapper)
        {
            _recommendationService = recommendationService;
            _mapper = mapper;
        }

        /// <summary>
        /// Get personalized food recommendations for a user
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <param name="count">Number of recommendations (default: 10)</param>
        /// <returns>List of recommended foods</returns>
        [HttpGet("foods/{userId}")]
        public async Task<ActionResult<List<FoodRecommendationDTO>>> GetFoodRecommendations(int userId, [FromQuery] int count = 10)
        {
            try
            {
                if (count <= 0 || count > 50)
                {
                    return BadRequest("Count must be between 1 and 50");
                }

                var recommendations = await _recommendationService.GetFoodRecommendationsAsync(userId, count);
                return Ok(recommendations);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error getting food recommendations: {ex.Message}");
            }
        }

        /// <summary>
        /// Get personalized exercise recommendations for a user
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <param name="count">Number of recommendations (default: 10)</param>
        /// <returns>List of recommended exercises</returns>
        [HttpGet("exercises/{userId}")]
        public async Task<ActionResult<List<ExerciseRecommendationDTO>>> GetExerciseRecommendations(int userId, [FromQuery] int count = 10)
        {
            try
            {
                if (count <= 0 || count > 50)
                {
                    return BadRequest("Count must be between 1 and 50");
                }

                var recommendations = await _recommendationService.GetExerciseRecommendationsAsync(userId, count);
                return Ok(recommendations);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error getting exercise recommendations: {ex.Message}");
            }
        }

        /// <summary>
        /// Get comprehensive personalized recommendations (foods + exercises)
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <param name="foodCount">Number of food recommendations (default: 5)</param>
        /// <param name="exerciseCount">Number of exercise recommendations (default: 5)</param>
        /// <returns>Personalized recommendations with health summary</returns>
        [HttpGet("personalized/{userId}")]
        public async Task<ActionResult<PersonalizedRecommendationDTO>> GetPersonalizedRecommendations(
            int userId,
            [FromQuery] int foodCount = 5,
            [FromQuery] int exerciseCount = 5)
        {
            try
            {
                if (foodCount <= 0 || foodCount > 20 || exerciseCount <= 0 || exerciseCount > 20)
                {
                    return BadRequest("Food count and exercise count must be between 1 and 20");
                }

                var recommendations = await _recommendationService.GetPersonalizedRecommendationsAsync(userId, foodCount, exerciseCount);
                return Ok(recommendations);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error getting personalized recommendations: {ex.Message}");
            }
        }

        /// <summary>
        /// Get user's health summary and metrics
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <returns>User health summary with BMI and recommendations</returns>
        [HttpGet("health-summary/{userId}")]
        public async Task<ActionResult<UserHealthSummaryDTO>> GetUserHealthSummary(int userId)
        {
            try
            {
                var healthSummary = await _recommendationService.GetUserHealthSummaryAsync(userId);
                return Ok(healthSummary);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error getting health summary: {ex.Message}");
            }
        }

        /// <summary>
        /// Get trending foods (most popular)
        /// </summary>
        /// <param name="count">Number of trending foods (default: 10)</param>
        /// <returns>List of trending foods</returns>
        [HttpGet("trending/foods")]
        public async Task<ActionResult<List<FoodRecommendationDTO>>> GetTrendingFoods([FromQuery] int count = 10)
        {
            try
            {
                if (count <= 0 || count > 50)
                {
                    return BadRequest("Count must be between 1 and 50");
                }

                var trendingFoods = await _recommendationService.GetTrendingFoodsAsync(count);
                return Ok(trendingFoods);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error getting trending foods: {ex.Message}");
            }
        }

        /// <summary>
        /// Get trending exercises (most popular)
        /// </summary>
        /// <param name="count">Number of trending exercises (default: 10)</param>
        /// <returns>List of trending exercises</returns>
        [HttpGet("trending/exercises")]
        public async Task<ActionResult<List<ExerciseRecommendationDTO>>> GetTrendingExercises([FromQuery] int count = 10)
        {
            try
            {
                if (count <= 0 || count > 50)
                {
                    return BadRequest("Count must be between 1 and 50");
                }

                var trendingExercises = await _recommendationService.GetTrendingExercisesAsync(count);
                return Ok(trendingExercises);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error getting trending exercises: {ex.Message}");
            }
        }

        /// <summary>
        /// Record user feedback on recommendations
        /// </summary>
        /// <param name="feedback">Feedback data</param>
        /// <returns>Success status</returns>
        [HttpPost("feedback")]
        public async Task<ActionResult> RecordFeedback([FromBody] RecommendationFeedbackDTO feedback)
        {
            try
            {
                if (feedback.UserId <= 0 || feedback.ItemId <= 0)
                {
                    return BadRequest("Invalid user ID or item ID");
                }

                if (string.IsNullOrEmpty(feedback.ItemType) ||
                    !new[] { "food", "exercise" }.Contains(feedback.ItemType.ToLower()))
                {
                    return BadRequest("Item type must be 'food' or 'exercise'");
                }

                if (string.IsNullOrEmpty(feedback.FeedbackType) ||
                    !new[] { "like", "dislike", "not_interested", "tried" }.Contains(feedback.FeedbackType.ToLower()))
                {
                    return BadRequest("Invalid feedback type");
                }

                feedback.FeedbackDate = DateTime.Now;
                var success = await _recommendationService.RecordFeedbackAsync(feedback);

                if (success)
                {
                    return Ok(new { message = "Feedback recorded successfully" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Failed to record feedback");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error recording feedback: {ex.Message}");
            }
        }

        /// <summary>
        /// Get similar users for collaborative filtering (admin only)
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <param name="count">Number of similar users (default: 10)</param>
        /// <returns>List of similar user IDs</returns>
        [HttpGet("similar-users/{userId}")]
        public async Task<ActionResult<List<int>>> GetSimilarUsers(int userId, [FromQuery] int count = 10)
        {
            try
            {
                if (count <= 0 || count > 100)
                {
                    return BadRequest("Count must be between 1 and 100");
                }

                var similarUsers = await _recommendationService.GetSimilarUsersAsync(userId, count);
                return Ok(similarUsers);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error getting similar users: {ex.Message}");
            }
        }

        /// <summary>
        /// Clear recommendation cache for a specific user
        /// Use this when user details are updated to ensure fresh recommendations
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <returns>Success status</returns>
        [HttpPost("clear-cache/{userId}")]
        public ActionResult ClearUserCache(int userId)
        {
            try
            {
                if (userId <= 0)
                {
                    return BadRequest("Invalid user ID");
                }

                _recommendationService.ClearUserRecommendationCache(userId);
                return Ok(new { message = $"Cache cleared successfully for user {userId}" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error clearing cache: {ex.Message}");
            }
        }

        /// <summary>
        /// Clear all recommendation cache (admin only)
        /// Use sparingly as it affects all users
        /// </summary>
        /// <returns>Success status</returns>
        [HttpPost("clear-cache/all")]
        public ActionResult ClearAllCache()
        {
            try
            {
                _recommendationService.ClearAllRecommendationCache();
                return Ok(new { message = "All recommendation cache cleared successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error clearing all cache: {ex.Message}");
            }
        }


    }
}
