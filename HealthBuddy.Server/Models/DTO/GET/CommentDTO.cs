namespace HealthBuddy.Server.Models.DTO.GET
{
    public class CommentDTO
    {
        public int CommentId { get; set; }
        public string TargetType { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public virtual UserPostedDTO User { get; set; } = null!;

    }
}