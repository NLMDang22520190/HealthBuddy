using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLFoodRepository : HealthBuddyRepository<Food>, IFoodRepository
    {
        private readonly DbContextOptions<HealthBuddyDbContext> _dbContextOptions;
        public SQLFoodRepository(HealthBuddyDbContext dbContext, DbContextOptions<HealthBuddyDbContext> dbContextOptions) : base(dbContext)
        {
            _dbContextOptions = dbContextOptions;
        }

        public async Task<Food> ApproveFood(int foodId)
        {
            var food = await dbContext.Foods
                            .Include(f => f.FoodTypes)
                            .Include(f => f.Recipes)
                                .ThenInclude(r => r.Ingredient)
                            .FirstOrDefaultAsync(f => f.FoodId == foodId);

            if (food == null)
            {
                return null; // Trả về null nếu không tìm thấy
            }

            // Cập nhật trạng thái approved
            food.IsApproved = true;

            // Cập nhật tất cả FoodTypes của Food
            foreach (var foodType in food.FoodTypes)
            {
                foodType.IsApproved = true;
            }

            // Cập nhật tất cả Ingredients từ Recipes
            foreach (var recipe in food.Recipes)
            {
                recipe.Ingredient.IsApproved = true;
            }

            await dbContext.SaveChangesAsync();
            return food;
        }

        public async Task<List<Food>> GetApprovedFoods()
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.Foods.Where(f => f.IsApproved == true && f.IsHidden == false).Include(f => f.Uploader)
                .Include(f => f.FoodTypes).AsNoTracking().ToListAsync();
            }
        }

        public async Task<List<Food>> GetApprovedFoodsByUserId(int userId)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.Foods.Where(f => f.UploaderId == userId && f.IsApproved == true && f.IsHidden == false)
                .Include(f => f.Uploader).Include(f => f.FoodTypes).AsNoTracking()
                .ToListAsync();
            }
        }

        public async Task<Food> GetFoodById(int foodId)
        {
            return await dbContext.Foods
            .Include(f => f.FoodTypes)
            .Include(f => f.Recipes).ThenInclude(r => r.Ingredient)
            .FirstOrDefaultAsync(f => f.FoodId == foodId);
        }

        public async Task<List<Food>> GetFoodsByKeyWord(string keyWord)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.Foods.Where(f => (f.Description.Contains(keyWord) || f.FoodName.Contains(keyWord) || f.HealthBenefits.Contains(keyWord))
                && f.IsApproved == true && f.IsHidden == false)
                .Include(f => f.Uploader)
                .Include(f => f.FoodTypes)
                .AsNoTracking().ToListAsync();
            }
        }

        public async Task<int> GetTotalFoodsByUserId(int userId)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.Foods.Where(f => f.UploaderId == userId).AsNoTracking().CountAsync();
            }
        }

        public async Task<Dictionary<int, int>> GetTotalFoodsByUserIds(List<int> userIds)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.Foods
                            .Where(f => userIds.Contains(f.UploaderId))
                            .GroupBy(f => f.UploaderId)
                            .Select(g => new { UserId = g.Key, Count = g.Count() }).AsNoTracking()
                            .ToDictionaryAsync(g => g.UserId, g => g.Count);
            }
        }
    }
}
