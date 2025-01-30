using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.DTO.GET;

public partial class MuscleTypeDTO
{
    public int MuscleTypeId { get; set; }

    public string MuscleTypeName { get; set; } = null!;
    public bool IsApproved { get; set; }

}
