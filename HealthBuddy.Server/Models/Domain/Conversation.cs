using System;
using System.Collections.Generic;

namespace HealthBuddy.Server.Models.Domain;

public partial class Conversation
{
    public int ConversationId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? LastMessageAt { get; set; }

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual ICollection<ConversationParticipant> ConversationParticipants { get; set; } = new List<ConversationParticipant>();
}
