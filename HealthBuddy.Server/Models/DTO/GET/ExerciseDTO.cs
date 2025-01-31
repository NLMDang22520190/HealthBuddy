namespace HealthBuddy.Server.Models.DTO.GET
{
    public class ExerciseDTO
    {
        public int ExerciseId { get; set; }

        public string ExerciseName { get; set; } = null!;

        public string? Description { get; set; }

        public string? DifficultyLevel { get; set; }

        public int? NumberOfReps { get; set; }

        public int? NumberOfSets { get; set; }

        public string? VideoUrl { get; set; }

        public string? ImgUrl { get; set; }

        public int? TimeBetweenSet { get; set; }

        public int? CaloriesBurned { get; set; }
        public int NumberOfLikes { get; set; }

        public int NumberOfComments { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public virtual List<ExerciseTypeDTO> ExerciseTypes { get; set; } = new List<ExerciseTypeDTO>();

        public virtual ICollection<MuscleTypeDTO> MuscleTypes { get; set; } = new List<MuscleTypeDTO>();
    }
}