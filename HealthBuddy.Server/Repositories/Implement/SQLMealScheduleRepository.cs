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
    }
}
