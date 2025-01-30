using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IExerciseTypeRepository : IHealthBuddyRepository<ExerciseType>
    {
        public Task<List<ExerciseType>> GetApprovedExerciseTypes();

        public Task<ExerciseType> GetExerciseTypeById(int id);
    }
}
