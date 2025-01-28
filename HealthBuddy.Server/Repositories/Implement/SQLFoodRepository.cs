using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLFoodRepository : HealthBuddyRepository<Food>, IFoodRepository
    {
        public SQLFoodRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Food>> GetApprovedFoods()
        {
            return await dbContext.Foods.Where(f => f.IsApproved == true).
            Include(f => f.Uploader).
            ToListAsync();
        }

        public async Task<Food> GetFoodById(int foodId)
        {
            return await dbContext.Foods
            .Include(f => f.FoodTypes)
            .Include(f => f.Recipes).ThenInclude(r => r.Ingredient)
            .FirstOrDefaultAsync(f => f.FoodId == foodId);
        }
    }
}
