using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IExerciseRepository : IHealthBuddyRepository<Exercise>
    {
        public Task<Exercise> GetExerciseById(int exerciseId);

        public Task<Exercise> ApproveExercise(int exerciseId);
        public Task<List<Exercise>> GetApprovedExercises();

    }
}
