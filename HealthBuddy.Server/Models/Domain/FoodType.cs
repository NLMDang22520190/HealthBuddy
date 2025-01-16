using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class FoodType
{
    public int FoodTypeId { get; set; }

    public string FoodTypeName { get; set; } = null!;

    public virtual ICollection<Food> Foods { get; set; } = new List<Food>();
}
