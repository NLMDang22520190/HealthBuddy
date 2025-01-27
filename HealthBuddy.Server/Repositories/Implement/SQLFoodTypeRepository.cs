using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLFoodTypeRepository : HealthBuddyRepository<FoodType>, IFoodTypeRepository
    {
        public SQLFoodTypeRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<FoodType>> GetApprovedFoodTypes()
        {
            return await dbContext.FoodTypes.Where(ft => ft.IsApproved).ToListAsync();
        }
    }
}
