using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IUserWorkoutTrackingRepository : IHealthBuddyRepository<UserWorkoutTracking>
    {
        Task<UserWorkoutTracking?> GetUserWorkoutTrackingByUserAndScheduleId(int userId, int workoutScheduleId);
    }
}
