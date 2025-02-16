namespace HealthBuddy.Server.Models.DTO.ADD
{
    public class AddLikeRequestDTO
    {
        public int TargetId { get; set; }
        public string TargetType { get; set; }

        public int UserId { get; set; }
    }
}