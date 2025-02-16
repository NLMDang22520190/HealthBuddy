namespace HealthBuddy.Server.Models.DTO.ADD
{
    public class AddCommentRequestDTO
    {
        public string TargetType { get; set; } = null!;

        public int TargetId { get; set; }

        public int UserId { get; set; }

        public string Content { get; set; } = null!;

    }
}
