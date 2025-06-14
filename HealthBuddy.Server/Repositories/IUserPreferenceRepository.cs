using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IUserPreferenceRepository : IHealthBuddyRepository<UserPreference>
    {
        Task<UserPreference?> GetUserPreferenceByUserIdAsync(int userId);
        Task<UserPreference> CreateOrUpdateUserPreferenceAsync(UserPreference userPreference);
        Task<List<UserPreference>> GetUserPreferencesByHealthGoalsAsync(string healthGoals);
        Task<List<UserPreference>> GetUserPreferencesByActivityLevelAsync(string activityLevel);
    }
}
