using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLWorkoutScheduleRepository : HealthBuddyRepository<WorkoutSchedule>, IWorkoutScheduleRepository
    {
        public SQLWorkoutScheduleRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
