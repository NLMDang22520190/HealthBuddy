using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IUserWorkoutScheduleRepository : IHealthBuddyRepository<UserWorkoutSchedule>
    {
        Task<List<UserWorkoutSchedule>> GetUserWorkoutSchedulesByUserAndScheduleId(int userId, int workoutScheduleId);
        Task<UserWorkoutSchedule?> GetUserWorkoutScheduleByUserScheduleAndDay(int userId, int workoutScheduleId, int dayNumber);
    }
}
