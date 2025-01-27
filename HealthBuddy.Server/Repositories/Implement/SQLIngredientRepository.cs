using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLIngredientRepository : HealthBuddyRepository<Ingredient>, IIngredientRepository
    {
        public SQLIngredientRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Ingredient>> GetApprovedIngredients()
        {
            return await dbContext.Ingredients.Where(i => i.IsApproved).ToListAsync();
        }
    }
}
