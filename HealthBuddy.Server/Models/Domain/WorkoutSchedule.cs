using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class WorkoutSchedule
{
    public int WorkoutScheduleId { get; set; }

    public int UploaderId { get; set; }

    public string WorkOutName { get; set; } = null!;

    public string? Description { get; set; }

    public int NumberOfLikes { get; set; }

    public int NumberOfComments { get; set; }

    public int TotalDays { get; set; }

    public bool IsApproved { get; set; }

    public bool IsHidden { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime UpdatedDate { get; set; }

    public virtual User Uploader { get; set; } = null!;

    public virtual ICollection<UserWorkoutSchedule> UserWorkoutSchedules { get; set; } = new List<UserWorkoutSchedule>();

    public virtual ICollection<UserWorkoutTracking> UserWorkoutTrackings { get; set; } = new List<UserWorkoutTracking>();

    public virtual ICollection<WorkoutDetail> WorkoutDetails { get; set; } = new List<WorkoutDetail>();
}
