using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserNotificationPreferenceRepository : HealthBuddyRepository<UserNotificationPreference>, IUserNotificationPreferenceRepository
    {
        public SQLUserNotificationPreferenceRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public Task<UserNotificationPreference> GetUserNotificationPreferenceByUserIdAsync(int userId)
        {
            return dbContext.UserNotificationPreferences.Where(u => u.UserId == userId).FirstOrDefaultAsync();
        }
    }
}
