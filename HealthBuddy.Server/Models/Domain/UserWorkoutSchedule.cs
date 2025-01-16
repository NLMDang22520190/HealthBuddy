using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class UserWorkoutSchedule
{
    public int UserWorkoutScheduleId { get; set; }

    public int UserId { get; set; }

    public int WorkoutScheduleId { get; set; }

    public int DayNumber { get; set; }

    public bool IsCompleted { get; set; }

    public DateTime? CompletionDate { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual WorkoutSchedule WorkoutSchedule { get; set; } = null!;
}
