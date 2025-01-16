using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserMealTrackingRepository : HealthBuddyRepository<UserMealTracking>, IUserMealTrackingRepository
    {
        public SQLUserMealTrackingRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
