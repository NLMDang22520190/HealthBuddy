namespace HealthBuddy.Server.Models.DTO.GET
{
    public class PostDTO
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImgUrl { get; set; }
        public int NumberOfLikes { get; set; }
        public int NumberOfComments { get; set; }
        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool IsApproved { get; set; }

        public bool IsHidden { get; set; }
        public string PostType { get; set; }

        public int TotalDays { get; set; } = 0;

        public List<TagDTO> Tags { get; set; } = new List<TagDTO>();
        public virtual UserPostedDTO Uploader { get; set; } = null!;
    }
}