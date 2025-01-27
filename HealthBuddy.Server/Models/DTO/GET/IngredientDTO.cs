using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.DTO.GET;

public partial class IngredientDTO
{
    public int IngredientId { get; set; }

    public string IngredientName { get; set; } = null!;

    public string? MeasurementUnit { get; set; }

    public bool IsApproved { get; set; }

}
