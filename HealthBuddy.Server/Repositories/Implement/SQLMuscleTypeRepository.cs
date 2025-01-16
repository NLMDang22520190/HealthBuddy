using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLMuscleTypeRepository : HealthBuddyRepository<MuscleType>, IMuscleTypeRepository
    {
        public SQLMuscleTypeRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
