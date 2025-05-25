namespace HealthBuddy.Server.Models.DTO.UPDATE
{
    public class CompleteDayRequestDTO
    {
        public int UserId { get; set; }
        public int ScheduleId { get; set; }
        public int DayNumber { get; set; }
        public string ScheduleType { get; set; } = null!; // "meal" or "workout"
    }
}
