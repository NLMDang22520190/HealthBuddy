using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IUserMealTrackingRepository : IHealthBuddyRepository<UserMealTracking>
    {
        Task<UserMealTracking?> GetUserMealTrackingByUserAndScheduleId(int userId, int mealScheduleId);
    }
}
