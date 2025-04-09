using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IWorkoutScheduleRepository : IHealthBuddyRepository<WorkoutSchedule>
    {
        Task<WorkoutSchedule> GetWorkoutScheduleByIdAsync(int id);
    }
}
