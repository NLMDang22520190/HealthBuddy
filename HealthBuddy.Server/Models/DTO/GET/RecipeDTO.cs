
namespace HealthBuddy.Server.Models.DTO.GET
{
    public class RecipeDTO
    {

        public double Quantity { get; set; }

        public virtual IngredientDTO Ingredient { get; set; } = null!;

    }
}