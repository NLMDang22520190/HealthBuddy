using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLMuscleTypeRepository : HealthBuddyRepository<MuscleType>, IMuscleTypeRepository
    {
        public SQLMuscleTypeRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<MuscleType>> GetApprovedMuscleTypes()
        {
            return await dbContext.MuscleTypes.Where(m => m.IsApproved).ToListAsync();
        }

        public async Task<MuscleType> GetMuscleTypeById(int id)
        {
            return await dbContext.MuscleTypes.FirstOrDefaultAsync(m => m.MuscleTypeId == id);
        }

    }
}
