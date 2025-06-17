using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class ConversationParticipant
{
    public int ConversationId { get; set; }

    public int UserId { get; set; }

    public DateTime JoinedAt { get; set; }

    public virtual Conversation Conversation { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
