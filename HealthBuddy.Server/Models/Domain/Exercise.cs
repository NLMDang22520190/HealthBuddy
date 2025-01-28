using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class Exercise
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

    public bool IsApproved { get; set; }

    public bool IsHidden { get; set; }

    public int UploaderId { get; set; }

    public int NumberOfLikes { get; set; }

    public int NumberOfComments { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime UpdatedDate { get; set; }

    public virtual User Uploader { get; set; } = null!;

    public virtual ICollection<WorkoutDetail> WorkoutDetails { get; set; } = new List<WorkoutDetail>();

    public virtual ICollection<ExerciseType> ExerciseTypes { get; set; } = new List<ExerciseType>();

    public virtual ICollection<MuscleType> MuscleTypes { get; set; } = new List<MuscleType>();
}
