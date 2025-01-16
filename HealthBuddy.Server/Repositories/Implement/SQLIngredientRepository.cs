using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLIngredientRepository : HealthBuddyRepository<Ingredient>, IIngredientRepository
    {
        public SQLIngredientRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
