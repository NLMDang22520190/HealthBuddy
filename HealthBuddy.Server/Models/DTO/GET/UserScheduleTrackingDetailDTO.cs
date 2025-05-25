namespace HealthBuddy.Server.Models.DTO.GET
{
    public class UserScheduleTrackingDetailDTO
    {
        public int ScheduleId { get; set; }
        public string ScheduleName { get; set; } = null!;
        public string? Description { get; set; }
        public string? ImgUrl { get; set; }
        public int TotalDays { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime TrackingDate { get; set; }
        public string ScheduleType { get; set; } = null!; // "meal" or "workout"

        public UserDTO Uploader { get; set; } = null!;
        public List<UserScheduleDayDTO> Days { get; set; } = new List<UserScheduleDayDTO>();
    }

    public class UserScheduleDayDTO
    {
        public int DayNumber { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? CompletionDate { get; set; }
        public bool CanComplete { get; set; } // Có thể complete ngày này không (dựa trên ngày hiện tại)
        public DateTime ExpectedDate { get; set; } // Ngày dự kiến complete (StartDate + DayNumber - 1)
        public List<DayItemDTO> Items { get; set; } = new List<DayItemDTO>(); // Danh sách món ăn/workout trong ngày
    }

    public class DayItemDTO
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; } = null!;
        public string? ItemImage { get; set; }
        public string ItemType { get; set; } = null!; // "food" hoặc "exercise"
    }
}
