using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class UserNotificationPreference
{
    public int UserId { get; set; }

    public bool FoodNoti { get; set; }

    public bool ExerciseNoti { get; set; }

    public bool WorkoutScheduleNoti { get; set; }

    public bool MealScheduleNoti { get; set; }

    public virtual User User { get; set; } = null!;
}
