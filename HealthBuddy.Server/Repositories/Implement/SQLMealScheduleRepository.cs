using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLMealScheduleRepository : HealthBuddyRepository<MealSchedule>, IMealScheduleRepository
    {
        public SQLMealScheduleRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<MealSchedule> GetMealScheduleByIdAsync(int id)
        {
            return await dbContext.MealSchedules
                .Include(ms => ms.MealDetails)
                .ThenInclude(md => md.Food)
                .FirstOrDefaultAsync(ms => ms.MealScheduleId == id);
        }
    }
}
