using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLFoodRepository : HealthBuddyRepository<Food>, IFoodRepository
    {
        public SQLFoodRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
