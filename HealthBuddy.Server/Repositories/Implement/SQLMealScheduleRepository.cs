using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLMealScheduleRepository : HealthBuddyRepository<MealSchedule>, IMealScheduleRepository
    {
        public SQLMealScheduleRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
