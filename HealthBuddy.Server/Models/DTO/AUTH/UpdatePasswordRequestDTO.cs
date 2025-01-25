namespace HealthBuddy.Server.Models.DTO.AUTH
{
    public class updatePasswordRequestDTO
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string NewPassword { get; set; } = null!;
    }
}