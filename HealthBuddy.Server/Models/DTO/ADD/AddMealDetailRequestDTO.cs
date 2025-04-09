using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.DTO.ADD;

public partial class AddMealDetailRequestDTO
{

    public int DayNumber { get; set; }

    public string MealTime { get; set; } = null!;

    public int FoodId { get; set; }

}
