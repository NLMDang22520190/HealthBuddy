using Microsoft.AspNetCore.Mvc;
using HealthBuddy.Server.Repositories;
using HealthBuddy.Server.Models.DTO.POST;
using HealthBuddy.Server.Models.DTO.GET;
using System.Security.Claims;

namespace HealthBuddy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IConversationRepository _conversationRepository;
        private readonly IUserRepository _userRepository;

        public MessageController(
            IMessageRepository messageRepository,
            IConversationRepository conversationRepository,
            IUserRepository userRepository)
        {
            _messageRepository = messageRepository;
            _conversationRepository = conversationRepository;
            _userRepository = userRepository;
        }

        // GET: api/Message/conversations/{userId}
        [HttpGet("conversations/{userId}")]
        public async Task<ActionResult<List<ConversationDTO>>> GetUserConversations(int userId)
        {
            try
            {
                var conversations = await _conversationRepository.GetConversationsByUserIdAsync(userId);
                return Ok(conversations);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Error fetching conversations: " + ex.Message });
            }
        }

        // GET: api/Message/conversation/{conversationId}/messages
        [HttpGet("conversation/{conversationId}/messages")]
        public async Task<ActionResult<List<MessageDTO>>> GetConversationMessages(
            int conversationId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] int userId = 0)
        {
            try
            {
                // Verify user is in conversation
                if (userId > 0)
                {
                    var isUserInConversation = await _conversationRepository.IsUserInConversationAsync(conversationId, userId);
                    if (!isUserInConversation)
                    {
                        return Forbid("User is not a participant in this conversation");
                    }
                }

                var messages = await _messageRepository.GetMessagesByConversationIdAsync(conversationId, page, pageSize);
                return Ok(messages);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Error fetching messages: " + ex.Message });
            }
        }

        // POST: api/Message/send
        [HttpPost("send")]
        public async Task<ActionResult<MessageDTO>> SendMessage([FromBody] SendMessageRequestDTO request, [FromQuery] int senderId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Verify user is in conversation
                var isUserInConversation = await _conversationRepository.IsUserInConversationAsync(request.ConversationId, senderId);
                if (!isUserInConversation)
                {
                    return Forbid("User is not a participant in this conversation");
                }

                // Send message
                var message = await _messageRepository.SendMessageAsync(request.ConversationId, senderId, request.Content);

                // Update conversation last message time
                await _conversationRepository.UpdateLastMessageTimeAsync(request.ConversationId);

                var messageDTO = new MessageDTO
                {
                    MessageId = message.MessageId,
                    ConversationId = message.ConversationId,
                    SenderId = message.SenderId,
                    SenderUsername = message.Sender.Username,
                    SenderAvatar = message.Sender.Avatar,
                    Content = message.Content,
                    SentAt = message.SentAt,
                    IsRead = message.IsRead
                };

                return Ok(messageDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Error sending message: " + ex.Message });
            }
        }

        // POST: api/Message/conversation
        [HttpPost("conversation")]
        public async Task<ActionResult<ConversationDTO>> CreateConversation(
            [FromBody] CreateConversationRequestDTO request,
            [FromQuery] int currentUserId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Check if target user exists
                var targetUser = await _userRepository.GetUserByIdAsync(request.ParticipantUserId);
                if (targetUser == null)
                {
                    return NotFound("Target user not found");
                }

                // Check if current user exists
                var currentUser = await _userRepository.GetUserByIdAsync(currentUserId);
                if (currentUser == null)
                {
                    return NotFound("Current user not found");
                }

                // Create or get existing conversation
                var conversation = await _conversationRepository.CreateConversationAsync(currentUserId, request.ParticipantUserId);

                // Get conversation DTO
                var conversations = await _conversationRepository.GetConversationsByUserIdAsync(currentUserId);
                var conversationDTO = conversations.FirstOrDefault(c => c.ConversationId == conversation.ConversationId);

                return Ok(conversationDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Error creating conversation: " + ex.Message });
            }
        }

        // PUT: api/Message/{messageId}/read
        [HttpPut("{messageId}/read")]
        public async Task<ActionResult> MarkMessageAsRead(int messageId, [FromQuery] int userId)
        {
            try
            {
                var result = await _messageRepository.MarkMessageAsReadAsync(messageId, userId);
                if (!result)
                {
                    return BadRequest("Unable to mark message as read");
                }

                return Ok(new { message = "Message marked as read" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Error marking message as read: " + ex.Message });
            }
        }

        // GET: api/Message/conversation/{conversationId}/unread-count
        [HttpGet("conversation/{conversationId}/unread-count")]
        public async Task<ActionResult<int>> GetUnreadMessageCount(int conversationId, [FromQuery] int userId)
        {
            try
            {
                var count = await _messageRepository.GetUnreadMessageCountAsync(conversationId, userId);
                return Ok(count);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Error getting unread count: " + ex.Message });
            }
        }
    }
}
