using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class MealSchedule
{
    public int MealScheduleId { get; set; }

    public int UploaderId { get; set; }

    public string MealName { get; set; } = null!;
    public string? Description { get; set; }

    public int NumberOfLikes { get; set; }

    public int NumberOfComments { get; set; }

    public string? ImgUrl { get; set; }

    public int TotalDays { get; set; }

    public bool IsApproved { get; set; }

    public bool IsHidden { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime UpdatedDate { get; set; }

    public virtual ICollection<MealDetail> MealDetails { get; set; } = new List<MealDetail>();

    public virtual User Uploader { get; set; } = null!;

    public virtual ICollection<UserMealSchedule> UserMealSchedules { get; set; } = new List<UserMealSchedule>();

    public virtual ICollection<UserMealTracking> UserMealTrackings { get; set; } = new List<UserMealTracking>();
}
