using System.ComponentModel.DataAnnotations;

namespace HealthBuddy.Server.Models.DTO.POST
{
    public class CreateConversationRequestDTO
    {
        [Required]
        public int ParticipantUserId { get; set; }
    }
}
