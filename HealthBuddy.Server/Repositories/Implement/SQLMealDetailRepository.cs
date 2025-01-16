using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLMealDetailRepository : HealthBuddyRepository<MealDetail>, IMealDetailRepository
    {
        public SQLMealDetailRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
