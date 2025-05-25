using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IWorkoutScheduleRepository : IHealthBuddyRepository<WorkoutSchedule>
    {
        Task<WorkoutSchedule> GetWorkoutScheduleByIdAsync(int id);

        Task<WorkoutSchedule> ApproveWorkoutScheduleAsync(int id);

        Task<List<WorkoutSchedule>> GetApprovedWorkoutSchedules();

        Task UpdateWorkoutLikes(int id, int newLikes);

        Task UpdateWorkoutComments(int id, int newComments);

        Task<List<WorkoutSchedule>> GetWorkoutSchedulesByKeyWord(string keyword);

        Task<Dictionary<int, int>> GetTotalWorkoutsByUserIds(List<int> userIds);

        Task<int> GetTotalWorkoutsByUserId(int userId);

        Task<List<WorkoutSchedule>> GetApprovedWorkoutsByUserId(int userId);

        Task<List<WorkoutSchedule>> GetUserTrackingWorkoutSchedules(int userId);
    }
}
