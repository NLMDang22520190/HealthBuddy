using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLMessageRepository : HealthBuddyRepository<Message>, IMessageRepository
    {
        public SQLMessageRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<MessageDTO>> GetMessagesByConversationIdAsync(int conversationId, int page = 1, int pageSize = 20)
        {
            var skip = (page - 1) * pageSize;

            var messages = await dbContext.Messages
                .Include(m => m.Sender)
                .Where(m => m.ConversationId == conversationId)
                .OrderByDescending(m => m.SentAt)
                .Skip(skip)
                .Take(pageSize)
                .Select(m => new MessageDTO
                {
                    MessageId = m.MessageId,
                    ConversationId = m.ConversationId,
                    SenderId = m.SenderId,
                    SenderUsername = m.Sender.Username,
                    SenderAvatar = m.Sender.Avatar,
                    Content = m.Content,
                    SentAt = m.SentAt,
                    IsRead = m.IsRead
                })
                .ToListAsync();

            // Reverse to show oldest first
            messages.Reverse();
            return messages;
        }

        public async Task<Message> SendMessageAsync(int conversationId, int senderId, string content)
        {
            var message = new Message
            {
                ConversationId = conversationId,
                SenderId = senderId,
                Content = content,
                SentAt = DateTime.Now,
                IsRead = false
            };

            await CreateAsync(message);

            // Load sender information for return
            await dbContext.Entry(message)
                .Reference(m => m.Sender)
                .LoadAsync();

            return message;
        }

        public async Task<bool> MarkMessageAsReadAsync(int messageId, int userId)
        {
            var message = await GetByIdAsync(messageId);
            if (message == null || message.SenderId == userId)
                return false;

            message.IsRead = true;
            await UpdateAsync(m => m.MessageId == messageId, m => m.IsRead = true);
            return true;
        }

        public async Task<int> GetUnreadMessageCountAsync(int conversationId, int userId)
        {
            return await dbContext.Messages
                .Where(m => m.ConversationId == conversationId &&
                           m.SenderId != userId &&
                           !m.IsRead)
                .CountAsync();
        }

        public async Task<Message> GetByIdAsync(int messageId)
        {
            return await dbContext.Messages
                .Include(m => m.Sender)
                .FirstOrDefaultAsync(m => m.MessageId == messageId);
        }
    }
}
