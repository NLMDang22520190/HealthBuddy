using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IFoodRepository : IHealthBuddyRepository<Food>
    {
        public Task<Food> GetFoodById(int foodId);

        public Task<Food> ApproveFood(int foodId);
        public Task<List<Food>> GetApprovedFoods();
    }
}
