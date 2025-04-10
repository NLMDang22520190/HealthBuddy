namespace HealthBuddy.Server.Models.DTO.GET
{
    public class ExerciseForScheduleDTO
    {
        public int ExerciseId { get; set; }

        public string ExerciseName { get; set; } = null!;

        public string? ImgUrl { get; set; }

    }
}