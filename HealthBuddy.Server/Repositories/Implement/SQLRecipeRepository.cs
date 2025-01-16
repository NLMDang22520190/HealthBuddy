using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLRecipeRepository : HealthBuddyRepository<Recipe>, IRecipeRepository
    {
        public SQLRecipeRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
