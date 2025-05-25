namespace HealthBuddy.Server.Models.DTO.GET
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public string? Avatar { get; set; }
    }
}
