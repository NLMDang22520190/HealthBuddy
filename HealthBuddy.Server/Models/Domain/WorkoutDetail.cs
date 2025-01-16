using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class WorkoutDetail
{
    public int WorkoutDetailId { get; set; }

    public int WorkoutScheduleId { get; set; }

    public int ExerciseId { get; set; }

    public int DayNumber { get; set; }

    public virtual Exercise Exercise { get; set; } = null!;

    public virtual WorkoutSchedule WorkoutSchedule { get; set; } = null!;
}
