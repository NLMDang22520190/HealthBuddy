namespace HealthBuddy.Server.Models.DTO.GET
{
    public class FoodDTO
    {

        public int FoodId { get; set; }

        public string FoodName { get; set; } = null!;

        public string? Description { get; set; }

        public string? ImgUrl { get; set; }

        public string? VideoUrl { get; set; }

        public int Calories { get; set; }

        public string? DifficultyLevel { get; set; }

        public string? HealthBenefits { get; set; }

        public int CookingTime { get; set; }

        public int Portion { get; set; }

        public int NumberOfLikes { get; set; }

        public int NumberOfComments { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public virtual List<RecipeDTO> Recipes { get; set; } = new List<RecipeDTO>();

        public virtual List<FoodTypeDTO> FoodTypes { get; set; } = new List<FoodTypeDTO>();
    }
}

