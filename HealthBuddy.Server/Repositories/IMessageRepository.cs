using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.GET;

namespace HealthBuddy.Server.Repositories
{
    public interface IMessageRepository : IHealthBuddyRepository<Message>
    {
        Task<List<MessageDTO>> GetMessagesByConversationIdAsync(int conversationId, int page = 1, int pageSize = 20);
        Task<Message> SendMessageAsync(int conversationId, int senderId, string content);
        Task<bool> MarkMessageAsReadAsync(int messageId, int userId);
        Task<int> GetUnreadMessageCountAsync(int conversationId, int userId);
    }
}
