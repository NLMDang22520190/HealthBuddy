using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.GET;

namespace HealthBuddy.Server.Repositories
{
    public interface IConversationRepository : IHealthBuddyRepository<Conversation>
    {
        Task<List<ConversationDTO>> GetConversationsByUserIdAsync(int userId);
        Task<Conversation?> GetConversationByParticipantsAsync(int userId1, int userId2);
        Task<Conversation> CreateConversationAsync(int currentUserId, int participantUserId);
        Task<bool> UpdateLastMessageTimeAsync(int conversationId);
        Task<bool> IsUserInConversationAsync(int conversationId, int userId);
    }
}
