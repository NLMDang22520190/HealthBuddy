using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserNotificationPreferenceRepository : HealthBuddyRepository<UserNotificationPreference>, IUserNotificationPreferenceRepository
    {
        public SQLUserNotificationPreferenceRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }
    }
}
