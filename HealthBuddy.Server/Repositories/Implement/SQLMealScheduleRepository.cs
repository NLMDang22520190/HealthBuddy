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

        public async Task<MealSchedule> ApproveMealScheduleAsync(int id)
        {
            var mealSchedule = await dbContext.MealSchedules
                .FirstOrDefaultAsync(ms => ms.MealScheduleId == id);
            if (mealSchedule == null)
            {
                return null; // Return null if not found
            }
            mealSchedule.IsApproved = true;
            await dbContext.SaveChangesAsync();
            return mealSchedule;
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
