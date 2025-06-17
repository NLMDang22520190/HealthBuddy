using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLConversationRepository : HealthBuddyRepository<Conversation>, IConversationRepository
    {
        public SQLConversationRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<ConversationDTO>> GetConversationsByUserIdAsync(int userId)
        {
            var conversations = await dbContext.ConversationParticipants
                .Include(cp => cp.Conversation)
                    .ThenInclude(c => c.Messages.OrderByDescending(m => m.SentAt).Take(1))
                        .ThenInclude(m => m.Sender)
                .Include(cp => cp.Conversation)
                    .ThenInclude(c => c.ConversationParticipants)
                        .ThenInclude(cp => cp.User)
                .Where(cp => cp.UserId == userId)
                .Select(cp => new ConversationDTO
                {
                    ConversationId = cp.Conversation.ConversationId,
                    CreatedAt = cp.Conversation.CreatedAt,
                    LastMessageAt = cp.Conversation.LastMessageAt,
                    LastMessageContent = cp.Conversation.Messages
                        .OrderByDescending(m => m.SentAt)
                        .FirstOrDefault() != null ?
                        cp.Conversation.Messages.OrderByDescending(m => m.SentAt).FirstOrDefault()!.Content : null,
                    LastMessageSenderId = cp.Conversation.Messages
                        .OrderByDescending(m => m.SentAt)
                        .FirstOrDefault() != null ?
                        cp.Conversation.Messages.OrderByDescending(m => m.SentAt).FirstOrDefault()!.SenderId : null,
                    Participants = cp.Conversation.ConversationParticipants
                        .Select(p => new ConversationParticipantDTO
                        {
                            UserId = p.UserId,
                            Username = p.User.Username,
                            Avatar = p.User.Avatar,
                            JoinedAt = p.JoinedAt
                        }).ToList()
                })
                .OrderByDescending(c => c.LastMessageAt ?? c.CreatedAt)
                .ToListAsync();

            return conversations;
        }

        public async Task<Conversation?> GetConversationByParticipantsAsync(int userId1, int userId2)
        {
            var conversation = await dbContext.Conversations
                .Include(c => c.ConversationParticipants)
                .Where(c => c.ConversationParticipants.Count == 2 &&
                           c.ConversationParticipants.Any(cp => cp.UserId == userId1) &&
                           c.ConversationParticipants.Any(cp => cp.UserId == userId2))
                .FirstOrDefaultAsync();

            return conversation;
        }

        public async Task<Conversation> CreateConversationAsync(int currentUserId, int participantUserId)
        {
            // Check if conversation already exists
            var existingConversation = await GetConversationByParticipantsAsync(currentUserId, participantUserId);
            if (existingConversation != null)
                return existingConversation;

            var conversation = new Conversation
            {
                CreatedAt = DateTime.Now,
                LastMessageAt = null
            };

            await CreateAsync(conversation);

            // Add participants
            var participants = new List<ConversationParticipant>
            {
                new ConversationParticipant
                {
                    ConversationId = conversation.ConversationId,
                    UserId = currentUserId,
                    JoinedAt = DateTime.Now
                },
                new ConversationParticipant
                {
                    ConversationId = conversation.ConversationId,
                    UserId = participantUserId,
                    JoinedAt = DateTime.Now
                }
            };

            dbContext.ConversationParticipants.AddRange(participants);
            await dbContext.SaveChangesAsync();

            return conversation;
        }

        public async Task<bool> UpdateLastMessageTimeAsync(int conversationId)
        {
            var conversation = await GetByIdAsync(conversationId);
            if (conversation == null)
                return false;

            await UpdateAsync(c => c.ConversationId == conversationId, c => c.LastMessageAt = DateTime.Now);
            return true;
        }

        public async Task<bool> IsUserInConversationAsync(int conversationId, int userId)
        {
            return await dbContext.ConversationParticipants
                .AnyAsync(cp => cp.ConversationId == conversationId && cp.UserId == userId);
        }

        public async Task<Conversation> GetByIdAsync(int conversationId)
        {
            return await dbContext.Conversations
                .Include(c => c.ConversationParticipants)
                    .ThenInclude(cp => cp.User)
                .FirstOrDefaultAsync(c => c.ConversationId == conversationId);
        }
    }
}
