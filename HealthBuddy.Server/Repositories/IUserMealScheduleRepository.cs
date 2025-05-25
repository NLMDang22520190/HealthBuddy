using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IUserMealScheduleRepository : IHealthBuddyRepository<UserMealSchedule>
    {
        Task<List<UserMealSchedule>> GetUserMealSchedulesByUserAndScheduleId(int userId, int mealScheduleId);
        Task<UserMealSchedule?> GetUserMealScheduleByUserScheduleAndDay(int userId, int mealScheduleId, int dayNumber);
    }
}
