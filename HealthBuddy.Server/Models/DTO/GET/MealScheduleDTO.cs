using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.DTO.GET;

public partial class MealScheduleDTO
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

    public virtual List<MealDetailDTO> MealDetails { get; set; } = new List<MealDetailDTO>();

}
