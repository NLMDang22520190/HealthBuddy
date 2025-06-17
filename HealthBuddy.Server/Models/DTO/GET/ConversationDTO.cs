namespace HealthBuddy.Server.Models.DTO.GET
{
    public class ConversationDTO
    {
        public int ConversationId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastMessageAt { get; set; }
        public string? LastMessageContent { get; set; }
        public int? LastMessageSenderId { get; set; }
        public List<ConversationParticipantDTO> Participants { get; set; } = new List<ConversationParticipantDTO>();
    }

    public class ConversationParticipantDTO
    {
        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public string? Avatar { get; set; }
        public DateTime JoinedAt { get; set; }
    }
}
