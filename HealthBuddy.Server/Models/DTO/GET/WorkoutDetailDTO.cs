using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.DTO.GET;

public partial class WorkoutDetailDTO
{
    public int DayNumber { get; set; }

    public virtual ExerciseForScheduleDTO Exercise { get; set; } = null!;


}
