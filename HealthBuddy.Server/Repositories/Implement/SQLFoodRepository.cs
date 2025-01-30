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
            return await dbContext.Foods.Where(f => f.IsApproved == true && f.IsHidden == false).
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
