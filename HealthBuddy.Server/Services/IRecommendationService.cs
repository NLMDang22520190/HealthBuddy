using HealthBuddy.Server.Models.DTO.GET;

namespace HealthBuddy.Server.Services
{
    public interface IRecommendationService
    {
        /// <summary>
        /// Get personalized food recommendations for a user
        /// </summary>
        Task<List<FoodRecommendationDTO>> GetFoodRecommendationsAsync(int userId, int count = 10);

        /// <summary>
        /// Get personalized exercise recommendations for a user
        /// </summary>
        Task<List<ExerciseRecommendationDTO>> GetExerciseRecommendationsAsync(int userId, int count = 10);

        /// <summary>
        /// Get comprehensive personalized recommendations
        /// </summary>
        Task<PersonalizedRecommendationDTO> GetPersonalizedRecommendationsAsync(int userId, int foodCount = 5, int exerciseCount = 5);

        /// <summary>
        /// Record user feedback on recommendations
        /// </summary>
        Task<bool> RecordFeedbackAsync(RecommendationFeedbackDTO feedback);

        /// <summary>
        /// Get similar users for collaborative filtering
        /// </summary>
        Task<List<int>> GetSimilarUsersAsync(int userId, int count = 10);

        /// <summary>
        /// Calculate BMI and health metrics
        /// </summary>
        Task<UserHealthSummaryDTO> GetUserHealthSummaryAsync(int userId);

        /// <summary>
        /// Get trending foods/exercises
        /// </summary>
        Task<List<FoodRecommendationDTO>> GetTrendingFoodsAsync(int count = 10);
        Task<List<ExerciseRecommendationDTO>> GetTrendingExercisesAsync(int count = 10);
    }
}
