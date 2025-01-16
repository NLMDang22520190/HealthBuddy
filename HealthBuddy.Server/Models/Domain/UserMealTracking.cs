using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class UserMealTracking
{
    public int UserMealTrackingId { get; set; }

    public int UserId { get; set; }

    public int MealScheduleId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime TrackingDate { get; set; }

    public virtual MealSchedule MealSchedule { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
