using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class Ingredient
{
    public int IngredientId { get; set; }

    public string IngredientName { get; set; } = null!;

    public string? MeasurementUnit { get; set; }

    public bool IsApproved { get; set; }

    public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
}
