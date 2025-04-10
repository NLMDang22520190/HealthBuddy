namespace HealthBuddy.Server.Models.DTO.GET
{
    public class FoodForScheduleDTO
    {

        public int FoodId { get; set; }
        public string FoodName { get; set; } = null!;

        public string? ImgUrl { get; set; }

    }
}

