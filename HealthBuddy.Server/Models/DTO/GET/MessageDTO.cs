namespace HealthBuddy.Server.Models.DTO.GET
{
    public class MessageDTO
    {
        public int MessageId { get; set; }
        public int ConversationId { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; } = null!;
        public string? SenderAvatar { get; set; }
        public string Content { get; set; } = null!;
        public DateTime SentAt { get; set; }
        public bool IsRead { get; set; }
    }
}
