using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.DTO.GET;

public partial class MealDetailDTO
{
    public int MealDetailId { get; set; }

    public int MealScheduleId { get; set; }

    public int DayNumber { get; set; }

    public string MealTime { get; set; } = null!;

    public int FoodId { get; set; }
    public virtual FoodForScheduleDTO Food { get; set; } = null!;

}
