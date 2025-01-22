namespace HealthBuddy.Server.Models.DTO.AUTH
{
    public class LoginRequestDTO
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}