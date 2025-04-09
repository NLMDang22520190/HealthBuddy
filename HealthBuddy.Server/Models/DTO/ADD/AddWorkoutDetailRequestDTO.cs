using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.DTO.ADD;

public partial class AddWorkoutDetailRequestDTO
{
    public int ExerciseId { get; set; }

    public int DayNumber { get; set; }

}
