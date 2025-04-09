using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLWorkoutScheduleRepository : HealthBuddyRepository<WorkoutSchedule>, IWorkoutScheduleRepository
    {
        private readonly DbContextOptions<HealthBuddyDbContext> _dbContextOptions;
        public SQLWorkoutScheduleRepository(HealthBuddyDbContext dbContext, DbContextOptions<HealthBuddyDbContext> dbContextOptions) : base(dbContext)
        {
            _dbContextOptions = dbContextOptions;
        }

        public async Task<WorkoutSchedule> ApproveWorkoutScheduleAsync(int id)
        {
            var workoutSchedule = await dbContext.WorkoutSchedules
                .FirstOrDefaultAsync(ws => ws.WorkoutScheduleId == id);
            if (workoutSchedule == null)
            {
                return null; // Return null if not found
            }
            workoutSchedule.IsApproved = true;
            await dbContext.SaveChangesAsync();
            return workoutSchedule;
        }

        public async Task<List<WorkoutSchedule>> GetApprovedWorkoutSchedules()
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                var result = await dbContext.WorkoutSchedules
                    .Where(e => e.IsApproved == true && e.IsHidden == false)
                    .Include(e => e.Uploader)
                    .AsNoTracking()
                    .ToListAsync();

                return result;
            }
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
