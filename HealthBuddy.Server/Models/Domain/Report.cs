using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class Report
{
    public int ReportId { get; set; }

    public string TargetType { get; set; } = null!;

    public int TargetId { get; set; }

    public int UserId { get; set; }

    public string? Reason { get; set; }

    public DateTime CreatedDate { get; set; }

    public virtual User User { get; set; } = null!;
}
