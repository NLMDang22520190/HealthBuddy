namespace HealthBuddy.Server.Models.DTO.UPDATE
{
    public class UpdateUserRequestDTO
    {
        public int UserId { get; set; }

        public string Username { get; set; } = null!;

        public string? Avatar { get; set; }

    }
}