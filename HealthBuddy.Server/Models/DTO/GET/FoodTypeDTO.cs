using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.DTO.GET;

public partial class FoodTypeDTO
{
    public int FoodTypeId { get; set; }

    public string FoodTypeName { get; set; } = null!;
    public bool IsApproved { get; set; }

}
