using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class Recipe
{
    public int FoodId { get; set; }

    public int IngredientId { get; set; }

    public double Quantity { get; set; }

    public virtual Food Food { get; set; } = null!;

    public virtual Ingredient Ingredient { get; set; } = null!;
}
