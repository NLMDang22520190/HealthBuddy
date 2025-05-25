using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserMealScheduleRepository : HealthBuddyRepository<UserMealSchedule>, IUserMealScheduleRepository
    {
        public SQLUserMealScheduleRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<UserMealSchedule>> GetUserMealSchedulesByUserAndScheduleId(int userId, int mealScheduleId)
        {
            return await dbContext.UserMealSchedules
                .Where(ums => ums.UserId == userId && ums.MealScheduleId == mealScheduleId)
                .OrderBy(ums => ums.DayNumber)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<UserMealSchedule?> GetUserMealScheduleByUserScheduleAndDay(int userId, int mealScheduleId, int dayNumber)
        {
            return await dbContext.UserMealSchedules
                .FirstOrDefaultAsync(ums => ums.UserId == userId && ums.MealScheduleId == mealScheduleId && ums.DayNumber == dayNumber);
        }
    }
}
