namespace HealthBuddy.Server.Models.DTO.GET
{
    public class UserDetailDTO
    {
        public int UserId { get; set; }

        public double? Height { get; set; }
        public double? Weight { get; set; }

        public string? HealthCondition { get; set; }

        public string? Allergies { get; set; }

    }
}