using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.DTO.GET;

public partial class WorkoutDetailDTO
{
    public int WorkoutDetailId { get; set; }

    public int WorkoutScheduleId { get; set; }

    public int ExerciseId { get; set; }

    public int DayNumber { get; set; }

    public virtual ExerciseForScheduleDTO Exercise { get; set; } = null!;


}
