using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLMealScheduleRepository : HealthBuddyRepository<MealSchedule>, IMealScheduleRepository
    {
        private readonly DbContextOptions<HealthBuddyDbContext> _dbContextOptions;
        public SQLMealScheduleRepository(HealthBuddyDbContext dbContext, DbContextOptions<HealthBuddyDbContext> dbContextOptions) : base(dbContext)
        {
            _dbContextOptions = dbContextOptions;
        }

        public async Task<MealSchedule> ApproveMealScheduleAsync(int id)
        {
            var mealSchedule = await dbContext.MealSchedules
                .FirstOrDefaultAsync(ms => ms.MealScheduleId == id);
            if (mealSchedule == null)
            {
                return null; // Return null if not found
            }
            mealSchedule.IsApproved = true;
            await dbContext.SaveChangesAsync();
            return mealSchedule;
        }

        public async Task<List<MealSchedule>> GetApprovedMealsByUserId(int userId)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.MealSchedules.Where(f => f.UploaderId == userId && f.IsApproved == true && f.IsHidden == false)
                .Include(e => e.Uploader)
                .AsNoTracking()
                .ToListAsync();
            }
        }

        public async Task<List<MealSchedule>> GetApprovedMealSchedules()
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                var result = await dbContext.MealSchedules
                    .Where(e => e.IsApproved == true && e.IsHidden == false)
                    .Include(e => e.Uploader)
                    .AsNoTracking()
                    .ToListAsync();

                return result;
            }
        }

        public async Task<MealSchedule> GetMealScheduleByIdAsync(int id)
        {
            return await dbContext.MealSchedules
                .Include(ms => ms.MealDetails)
                .ThenInclude(md => md.Food)
                .FirstOrDefaultAsync(ms => ms.MealScheduleId == id);
        }

        public async Task<List<MealSchedule>> GetMealSchedulesByKeyWord(string keyword)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                var result = await dbContext.MealSchedules
                    .Where(e => (e.MealName.Contains(keyword) || e.Description.Contains(keyword)) && e.IsApproved == true && e.IsHidden == false)
                    .Include(e => e.Uploader)
                    .AsNoTracking()
                    .ToListAsync();

                return result;
            }
        }

        public async Task<int> GetTotalMealsByUserId(int userId)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.MealSchedules.Where(f => f.UploaderId == userId).AsNoTracking().CountAsync();
            }
        }

        public async Task<Dictionary<int, int>> GetTotalMealsByUserIds(List<int> userIds)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.MealSchedules
                            .Where(f => userIds.Contains(f.UploaderId))
                            .GroupBy(f => f.UploaderId)
                            .Select(g => new { UserId = g.Key, Count = g.Count() }).AsNoTracking()
                            .ToDictionaryAsync(g => g.UserId, g => g.Count);
            }
        }

        public async Task UpdateMealComments(int id, int newComments)
        {
            var schedule = await dbContext.MealSchedules.FirstOrDefaultAsync(s => s.MealScheduleId == id);
            if (schedule != null)
            {
                schedule.NumberOfComments += newComments;
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task UpdateMealLikes(int id, int newLikes)
        {
            var schedule = await dbContext.MealSchedules.FirstOrDefaultAsync(s => s.MealScheduleId == id);
            if (schedule != null)
            {
                schedule.NumberOfLikes += newLikes;
                await dbContext.SaveChangesAsync();
            }
        }
    }
}
