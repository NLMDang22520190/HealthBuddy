namespace HealthBuddy.Server.Models.DTO.GET
{
    public class UserProfileInfoDTO
    {
        public int UserId { get; set; }

        public string Username { get; set; } = null!;

        public string? Avatar { get; set; }

        public string Email { get; set; } = null!;

        public string Provider { get; set; } = null!;

        public int NumberOfFoodPosts { get; set; } = 0;

        public int NumberOfExercisePosts { get; set; } = 0;

        public int NumberOfWorkoutPosts { get; set; } = 0;

        public int NumberOfMealPosts { get; set; } = 0;

        public DateTime CreatedDate { get; set; }
    }
}