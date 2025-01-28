using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IFoodTypeRepository : IHealthBuddyRepository<FoodType>
    {
        public Task<FoodType> GetFoodTypeById(int id);
        public Task<List<FoodType>> GetApprovedFoodTypes();
    }
}
