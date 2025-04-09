using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLWorkoutScheduleRepository : HealthBuddyRepository<WorkoutSchedule>, IWorkoutScheduleRepository
    {
        public SQLWorkoutScheduleRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<WorkoutSchedule> GetWorkoutScheduleByIdAsync(int id)
        {
            return await dbContext.WorkoutSchedules
            .Include(ws => ws.WorkoutDetails)
                .ThenInclude(wd => wd.Exercise)
            .FirstOrDefaultAsync(ws => ws.WorkoutScheduleId == id);
        }
    }
}
