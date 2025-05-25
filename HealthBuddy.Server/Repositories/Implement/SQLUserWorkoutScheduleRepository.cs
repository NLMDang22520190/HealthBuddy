using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserWorkoutScheduleRepository : HealthBuddyRepository<UserWorkoutSchedule>, IUserWorkoutScheduleRepository
    {
        public SQLUserWorkoutScheduleRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<UserWorkoutSchedule>> GetUserWorkoutSchedulesByUserAndScheduleId(int userId, int workoutScheduleId)
        {
            return await dbContext.UserWorkoutSchedules
                .Where(uws => uws.UserId == userId && uws.WorkoutScheduleId == workoutScheduleId)
                .OrderBy(uws => uws.DayNumber)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<UserWorkoutSchedule?> GetUserWorkoutScheduleByUserScheduleAndDay(int userId, int workoutScheduleId, int dayNumber)
        {
            return await dbContext.UserWorkoutSchedules
                .FirstOrDefaultAsync(uws => uws.UserId == userId && uws.WorkoutScheduleId == workoutScheduleId && uws.DayNumber == dayNumber);
        }
    }
}
