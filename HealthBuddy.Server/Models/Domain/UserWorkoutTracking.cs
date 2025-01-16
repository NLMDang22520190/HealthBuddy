using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class UserWorkoutTracking
{
    public int UserWorkoutTrackingId { get; set; }

    public int UserId { get; set; }

    public int WorkoutScheduleId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime TrackingDate { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual WorkoutSchedule WorkoutSchedule { get; set; } = null!;
}
