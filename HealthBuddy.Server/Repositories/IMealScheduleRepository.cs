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
    }
}
