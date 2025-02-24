using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IIngredientRepository : IHealthBuddyRepository<Ingredient>
    {
        public Task<List<Ingredient>> GetApprovedIngredients();
    }
}
