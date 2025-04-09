namespace HealthBuddy.Server.Models.DTO.GET
{
    public partial class WorkoutScheduleDTO
    {
        public int WorkoutScheduleId { get; set; }

        public int UploaderId { get; set; }

        public string WorkOutName { get; set; } = null!;

        public string? Description { get; set; }

        public int NumberOfLikes { get; set; }

        public int NumberOfComments { get; set; }

        public string? ImgUrl { get; set; }

        public int TotalDays { get; set; }

        public bool IsApproved { get; set; }

        public bool IsHidden { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public virtual List<WorkoutDetailDTO> WorkoutDetails { get; set; } = new List<WorkoutDetailDTO>();
    }
}