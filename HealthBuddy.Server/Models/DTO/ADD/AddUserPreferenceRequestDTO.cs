namespace HealthBuddy.Server.Models.DTO.ADD
{
    public class AddUserPreferenceRequestDTO
    {
        public int UserId { get; set; }
        
        // Dietary Preferences
        public string? DietaryRestrictions { get; set; } // JSON: ["vegetarian", "vegan", "keto", "low-carb"]
        public string? PreferredCuisines { get; set; } // JSON: ["asian", "mediterranean", "italian"]
        public string? DislikedIngredients { get; set; } // JSON: ["mushroom", "seafood"]
        public int? MaxCookingTime { get; set; } // Minutes
        public string? PreferredDifficultyLevel { get; set; } // "easy", "medium", "hard"
        public int? TargetCaloriesPerMeal { get; set; }
        
        // Exercise Preferences  
        public string? PreferredExerciseTypes { get; set; } // JSON: ["cardio", "strength", "yoga"]
        public string? PreferredMuscleGroups { get; set; } // JSON: ["chest", "legs", "core"]
        public int? MaxWorkoutDuration { get; set; } // Minutes
        public string? FitnessGoals { get; set; } // JSON: ["weight_loss", "muscle_gain", "endurance"]
        public string? PreferredWorkoutTime { get; set; } // "morning", "afternoon", "evening"
        public int? FitnessLevel { get; set; } // 1-5 scale
        
        // Health Goals
        public double? TargetWeight { get; set; }
        public int? TargetCaloriesPerDay { get; set; }
        public string? HealthGoals { get; set; } // JSON: ["lose_weight", "gain_muscle", "maintain"]
        
        // Activity Level
        public string? ActivityLevel { get; set; } // "sedentary", "lightly_active", "moderately_active", "very_active"
    }
}
