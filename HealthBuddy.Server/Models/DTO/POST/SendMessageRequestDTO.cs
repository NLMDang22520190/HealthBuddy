using System.ComponentModel.DataAnnotations;

namespace HealthBuddy.Server.Models.DTO.POST
{
    public class SendMessageRequestDTO
    {
        [Required]
        public int ConversationId { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 1, ErrorMessage = "Message content must be between 1 and 1000 characters")]
        public string Content { get; set; } = null!;
    }
}
