namespace HealthBuddy.Server.Models.DTO.GET
{
    public class FoodRecommendationDTO
    {
        public int FoodId { get; set; }
        public string FoodName { get; set; } = null!;
        public string? Description { get; set; }
        public string? ImgUrl { get; set; }
        public int Calories { get; set; }
        public string? DifficultyLevel { get; set; }
        public string? HealthBenefits { get; set; }
        public int CookingTime { get; set; }
        public int Portion { get; set; }
        public double RecommendationScore { get; set; }
        public string RecommendationReason { get; set; } = null!;
        public List<string> FoodTypes { get; set; } = new List<string>();
        public bool IsLikedByUser { get; set; }
    }

    public class ExerciseRecommendationDTO
    {
        public int ExerciseId { get; set; }
        public string ExerciseName { get; set; } = null!;
        public string? Description { get; set; }
        public string? DifficultyLevel { get; set; }
        public int? NumberOfReps { get; set; }
        public int? NumberOfSets { get; set; }
        public string? VideoUrl { get; set; }
        public string? ImgUrl { get; set; }
        public int? CaloriesBurned { get; set; }
        public double RecommendationScore { get; set; }
        public string RecommendationReason { get; set; } = null!;
        public List<string> ExerciseTypes { get; set; } = new List<string>();
        public List<string> MuscleTypes { get; set; } = new List<string>();
        public bool IsLikedByUser { get; set; }
    }

    public class PersonalizedRecommendationDTO
    {
        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public List<FoodRecommendationDTO> RecommendedFoods { get; set; } = new List<FoodRecommendationDTO>();
        public List<ExerciseRecommendationDTO> RecommendedExercises { get; set; } = new List<ExerciseRecommendationDTO>();
        public UserHealthSummaryDTO HealthSummary { get; set; } = null!;
        public DateTime GeneratedAt { get; set; }
    }

    public class UserHealthSummaryDTO
    {
        public double? Height { get; set; }
        public double? Weight { get; set; }
        public double? BMI { get; set; }
        public string? HealthCondition { get; set; }
        public string? Allergies { get; set; }
        public string? ActivityLevel { get; set; }
        public int? TargetCaloriesPerDay { get; set; }
        public string? FitnessGoals { get; set; }
    }

    public class RecommendationFeedbackDTO
    {
        public int UserId { get; set; }
        public int ItemId { get; set; }
        public string ItemType { get; set; } = null!; // "food" or "exercise"
        public string FeedbackType { get; set; } = null!; // "like", "dislike", "not_interested", "tried"
        public int? Rating { get; set; } // 1-5 stars
        public string? Comment { get; set; }
        public DateTime FeedbackDate { get; set; }
    }
}
