using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class ExerciseType
{
    public int ExerciseTypeId { get; set; }

    public string ExerciseName { get; set; } = null!;

    public virtual ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
}
