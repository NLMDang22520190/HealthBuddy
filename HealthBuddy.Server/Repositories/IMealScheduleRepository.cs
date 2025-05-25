using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IMealScheduleRepository : IHealthBuddyRepository<MealSchedule>
    {
        Task<MealSchedule> GetMealScheduleByIdAsync(int id);

        Task<MealSchedule> ApproveMealScheduleAsync(int id);

        Task<List<MealSchedule>> GetApprovedMealSchedules();

        Task UpdateMealLikes(int id, int newLikes);

        Task UpdateMealComments(int id, int newComments);

        Task<List<MealSchedule>> GetMealSchedulesByKeyWord(string keyword);

        Task<Dictionary<int, int>> GetTotalMealsByUserIds(List<int> userIds);

        Task<int> GetTotalMealsByUserId(int userId);

        Task<List<MealSchedule>> GetApprovedMealsByUserId(int userId);

        Task<List<MealSchedule>> GetUserTrackingMealSchedules(int userId);
    }
}
