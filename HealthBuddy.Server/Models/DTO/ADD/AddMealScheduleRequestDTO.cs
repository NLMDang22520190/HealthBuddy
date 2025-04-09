using HealthBuddy.Server.Models.DTO.GET;

namespace HealthBuddy.Server.Models.DTO.ADD
{
    public partial class AddMealScheduleRequestDTO
    {

        public int UploaderId { get; set; }

        public string MealName { get; set; } = null!;
        public string? Description { get; set; }

        public string? ImgUrl { get; set; }

        public int TotalDays { get; set; }

        public virtual ICollection<AddMealDetailRequestDTO> MealDetails { get; set; } = new List<AddMealDetailRequestDTO>();

    }
}