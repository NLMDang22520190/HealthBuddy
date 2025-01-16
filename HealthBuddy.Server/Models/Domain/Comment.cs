using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class Comment
{
    public int CommentId { get; set; }

    public string TargetType { get; set; } = null!;

    public int TargetId { get; set; }

    public int UserId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public virtual User User { get; set; } = null!;
}
