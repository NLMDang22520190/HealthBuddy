using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.DTO.ADD;

public partial class AddWorkoutScheduleRequestDTO
{
    public int UploaderId { get; set; }

    public string WorkOutName { get; set; } = null!;

    public string? Description { get; set; }

    public string? ImgUrl { get; set; }

    public int TotalDays { get; set; }

    public virtual List<AddWorkoutDetailRequestDTO> WorkoutDetails { get; set; } = new List<AddWorkoutDetailRequestDTO>();
}
