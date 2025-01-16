using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class UserMealSchedule
{
    public int UserMealScheduleId { get; set; }

    public int UserId { get; set; }

    public int MealScheduleId { get; set; }

    public int DayNumber { get; set; }

    public bool IsCompleted { get; set; }

    public DateTime? CompletionDate { get; set; }

    public virtual MealSchedule MealSchedule { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
