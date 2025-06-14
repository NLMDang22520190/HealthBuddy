namespace HealthBuddy.Server.Models.DTO.GET
{
    public class UserPreferenceDTO
    {
        public int UserPreferenceId { get; set; }
        public int UserId { get; set; }
        
        // Dietary Preferences
        public string? DietaryRestrictions { get; set; }
        public string? PreferredCuisines { get; set; }
        public string? DislikedIngredients { get; set; }
        public int? MaxCookingTime { get; set; }
        public string? PreferredDifficultyLevel { get; set; }
        public int? TargetCaloriesPerMeal { get; set; }
        
        // Exercise Preferences  
        public string? PreferredExerciseTypes { get; set; }
        public string? PreferredMuscleGroups { get; set; }
        public int? MaxWorkoutDuration { get; set; }
        public string? FitnessGoals { get; set; }
        public string? PreferredWorkoutTime { get; set; }
        public int? FitnessLevel { get; set; }
        
        // Health Goals
        public double? TargetWeight { get; set; }
        public int? TargetCaloriesPerDay { get; set; }
        public string? HealthGoals { get; set; }
        
        // Activity Level
        public string? ActivityLevel { get; set; }
        
        // Timestamps
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        
        // User Info
        public string? Username { get; set; }
    }
}
