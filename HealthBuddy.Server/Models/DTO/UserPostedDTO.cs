namespace HealthBuddy.Server.Models.DTO
{
    public class UserPostedDTO
    {
        public int UserId { get; set; }

        public string Username { get; set; } = null!;
        public string? Avatar { get; set; }

    }
}