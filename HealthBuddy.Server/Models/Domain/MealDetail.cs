using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class MealDetail
{
    public int MealDetailId { get; set; }

    public int MealScheduleId { get; set; }

    public int DayNumber { get; set; }

    public string MealTime { get; set; } = null!;

    public int FoodId { get; set; }

    public virtual Food Food { get; set; } = null!;

    public virtual MealSchedule MealSchedule { get; set; } = null!;
}
