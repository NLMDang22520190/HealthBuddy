using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLExerciseTypeRepository : HealthBuddyRepository<ExerciseType>, IExerciseTypeRepository
    {
        public SQLExerciseTypeRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
