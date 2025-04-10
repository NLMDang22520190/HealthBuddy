using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.DTO.GET;

public partial class MealDetailDTO
{

    public int DayNumber { get; set; }

    public string MealTime { get; set; } = null!;

    public virtual FoodForScheduleDTO Food { get; set; } = null!;

}
