using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserMealScheduleRepository : HealthBuddyRepository<UserMealSchedule>, IUserMealScheduleRepository
    {
        public SQLUserMealScheduleRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
