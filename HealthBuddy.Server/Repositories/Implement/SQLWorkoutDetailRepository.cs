using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLWorkoutDetailRepository : HealthBuddyRepository<WorkoutDetail>, IWorkoutDetailRepository
    {
        public SQLWorkoutDetailRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
