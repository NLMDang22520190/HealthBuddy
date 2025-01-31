namespace HealthBuddy.Server.Models.DTO.ADD
{
    public class AddExerciseRequestDTO
    {
        public string ExerciseName { get; set; } = null!;

        public string? Description { get; set; }

        public string? DifficultyLevel { get; set; }

        public int? NumberOfReps { get; set; }

        public int? NumberOfSets { get; set; }

        public string? VideoUrl { get; set; }

        public string? ImgUrl { get; set; }

        public int? TimeBetweenSet { get; set; }

        public int? CaloriesBurned { get; set; }

        public int UploaderId { get; set; }

        public List<int> ExerciseTypeIds { get; set; } = new List<int>();

        public List<int> MuscleTypeIds { get; set; } = new List<int>();
    }
}