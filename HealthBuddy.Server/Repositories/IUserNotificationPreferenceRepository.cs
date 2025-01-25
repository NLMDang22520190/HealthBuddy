using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IUserNotificationPreferenceRepository : IHealthBuddyRepository<UserNotificationPreference>
    {
        Task<UserNotificationPreference> GetUserNotificationPreferenceByUserIdAsync(int userId);
    }
}
