using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class UserDetail
{
    public int UserId { get; set; }

    public double? Height { get; set; }

    public double? Weight { get; set; }

    public string? HealthCondition { get; set; }

    public string? Allergies { get; set; }

    public virtual User User { get; set; } = null!;
}
