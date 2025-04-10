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

        public async Task<List<WorkoutSchedule>> GetApprovedWorkoutsByUserId(int userId)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.WorkoutSchedules.Where(f => f.UploaderId == userId && f.IsApproved == true && f.IsHidden == false).Include(e => e.Uploader)
                .AsNoTracking()
                .ToListAsync();
            }
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

        public async Task<int> GetTotalWorkoutsByUserId(int userId)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.WorkoutSchedules.Where(f => f.UploaderId == userId).AsNoTracking().CountAsync();
            }
        }

        public async Task<Dictionary<int, int>> GetTotalWorkoutsByUserIds(List<int> userIds)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.WorkoutSchedules
                            .Where(f => userIds.Contains(f.UploaderId))
                            .GroupBy(f => f.UploaderId)
                            .Select(g => new { UserId = g.Key, Count = g.Count() }).AsNoTracking()
                            .ToDictionaryAsync(g => g.UserId, g => g.Count);
            }
        }

        public async Task<WorkoutSchedule> GetWorkoutScheduleByIdAsync(int id)
        {
            return await dbContext.WorkoutSchedules
            .Include(ws => ws.WorkoutDetails)
                .ThenInclude(wd => wd.Exercise)
            .FirstOrDefaultAsync(ws => ws.WorkoutScheduleId == id);
        }

        public async Task<List<WorkoutSchedule>> GetWorkoutSchedulesByKeyWord(string keyword)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                var result = await dbContext.WorkoutSchedules
                    .Where(e => (e.WorkOutName.Contains(keyword) || e.Description.Contains(keyword)) && e.IsApproved == true && e.IsHidden == false)
                    .Include(e => e.Uploader)
                    .AsNoTracking()
                    .ToListAsync();

                return result;
            }
        }

        public async Task UpdateWorkoutComments(int id, int newComments)
        {
            var schedule = await dbContext.WorkoutSchedules.FirstOrDefaultAsync(s => s.WorkoutScheduleId == id);
            if (schedule != null)
            {
                schedule.NumberOfComments += newComments;
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task UpdateWorkoutLikes(int id, int newLikes)
        {
            var schedule = await dbContext.WorkoutSchedules.FirstOrDefaultAsync(s => s.WorkoutScheduleId == id);
            if (schedule != null)
            {
                schedule.NumberOfLikes += newLikes;
                await dbContext.SaveChangesAsync();
            }
        }
    }
}
