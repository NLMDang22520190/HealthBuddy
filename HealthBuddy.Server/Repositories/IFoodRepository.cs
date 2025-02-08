using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IFoodRepository : IHealthBuddyRepository<Food>
    {
        public Task<Food> GetFoodById(int foodId);

        public Task<Food> ApproveFood(int foodId);
        public Task<List<Food>> GetApprovedFoods();

        public Task<List<Food>> GetApprovedFoodsByUserId(int userId);

        public Task<int> GetTotalFoodsByUserId(int userId);

        public Task<Dictionary<int, int>> GetTotalFoodsByUserIds(List<int> userIds);

        public Task<List<Food>> GetFoodsByKeyWord(string keyWord);

    }
}
