namespace HealthBuddy.Server.Models.DTO.ADD
{
    public class FollowWorkoutScheduleRequestDTO
    {
        public int UserId { get; set; }

        public int WorkoutScheduleId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime TrackingDate { get; set; }
    }
}
