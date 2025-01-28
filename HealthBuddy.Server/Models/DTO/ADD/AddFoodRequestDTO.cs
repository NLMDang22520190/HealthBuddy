using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Models.DTO.ADD
{
    public class AddFoodRequestDTO
    {
        public string FoodName { get; set; } = null!;

        public string? Description { get; set; }

        public string? ImgUrl { get; set; }

        public string? VideoUrl { get; set; }

        public int Calories { get; set; }

        public string? DifficultyLevel { get; set; }

        public string? HealthBenefits { get; set; }

        public int CookingTime { get; set; }

        public int Portion { get; set; }

        public int UploaderId { get; set; }

        public virtual List<int> FoodTypeIds { get; set; } = new List<int>();

        public virtual List<RecipeDTO> Recipes { get; set; } = new List<RecipeDTO>();

    }
}