using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserWorkoutTrackingRepository : HealthBuddyRepository<UserWorkoutTracking>, IUserWorkoutTrackingRepository
    {
        public SQLUserWorkoutTrackingRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<UserWorkoutTracking?> GetUserWorkoutTrackingByUserAndScheduleId(int userId, int workoutScheduleId)
        {
            return await dbContext.UserWorkoutTrackings
                .Include(uwt => uwt.WorkoutSchedule)
                    .ThenInclude(ws => ws.Uploader)
                .FirstOrDefaultAsync(uwt => uwt.UserId == userId && uwt.WorkoutScheduleId == workoutScheduleId);
        }
    }
}
