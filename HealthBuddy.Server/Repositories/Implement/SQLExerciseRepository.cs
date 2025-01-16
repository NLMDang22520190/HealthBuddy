using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLExerciseRepository : HealthBuddyRepository<Exercise>, IExerciseRepository
    {
        public SQLExerciseRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
