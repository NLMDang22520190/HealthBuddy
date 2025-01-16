using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserWorkoutScheduleRepository : HealthBuddyRepository<UserWorkoutSchedule>, IUserWorkoutScheduleRepository
    {
        public SQLUserWorkoutScheduleRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
