using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IMuscleTypeRepository : IHealthBuddyRepository<MuscleType>
    {
        public Task<List<MuscleType>> GetApprovedMuscleTypes();

        public Task<MuscleType> GetMuscleTypeById(int id);
    }
}
