using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserMealTrackingRepository : HealthBuddyRepository<UserMealTracking>, IUserMealTrackingRepository
    {
        public SQLUserMealTrackingRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<UserMealTracking?> GetUserMealTrackingByUserAndScheduleId(int userId, int mealScheduleId)
        {
            return await dbContext.UserMealTrackings
                .Include(umt => umt.MealSchedule)
                    .ThenInclude(ms => ms.Uploader)
                .FirstOrDefaultAsync(umt => umt.UserId == userId && umt.MealScheduleId == mealScheduleId);
        }
    }
}
