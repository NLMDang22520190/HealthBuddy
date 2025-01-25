namespace HealthBuddy.Server.Models.DTO.UPDATE
{
    public class UpdateUserDetailRequestDTO
    {
        public int UserId { get; set; }
        public double? Height { get; set; }
        public double? Weight { get; set; }
        public string? HealthCondition { get; set; }

        public string? Allergies { get; set; }
    }
}