using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.DTO.GET;

public partial class ExerciseTypeDTO
{
    public int ExerciseTypeId { get; set; }

    public string ExerciseName { get; set; } = null!;

    public bool IsApproved { get; set; }

}
