namespace HealthBuddy.Server.Models.DTO.ADD
{
    public class FollowMealScheduleRequestDTO
    {
        public int UserId { get; set; }

        public int MealScheduleId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime TrackingDate { get; set; }
    }
}
