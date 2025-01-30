using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLExerciseTypeRepository : HealthBuddyRepository<ExerciseType>, IExerciseTypeRepository
    {
        public SQLExerciseTypeRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<ExerciseType>> GetApprovedExerciseTypes()
        {
            return await dbContext.ExerciseTypes.Where(e => e.IsApproved).ToListAsync();
        }

        public async Task<ExerciseType> GetExerciseTypeById(int id)
        {
            return await dbContext.ExerciseTypes.FirstOrDefaultAsync(e => e.ExerciseTypeId == id);
        }
    }
}
