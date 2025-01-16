using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserWorkoutTrackingRepository : HealthBuddyRepository<UserWorkoutTracking>, IUserWorkoutTrackingRepository
    {
        public SQLUserWorkoutTrackingRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
