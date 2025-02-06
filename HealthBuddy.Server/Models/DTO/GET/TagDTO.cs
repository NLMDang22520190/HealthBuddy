namespace HealthBuddy.Server.Models.DTO.GET
{
    public class TagDTO
    {
        public int TagId { get; set; }
        public string TagName { get; set; } = null!;

        public string TagType { get; set; } = null!;
    }
}