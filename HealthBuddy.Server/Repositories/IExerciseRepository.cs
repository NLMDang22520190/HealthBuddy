using HealthBuddy.Server.Models.Domain;

namespace HealthBuddy.Server.Repositories
{
    public interface IExerciseRepository : IHealthBuddyRepository<Exercise>
    {
        public Task<Exercise> GetExerciseById(int exerciseId);

        public Task<Exercise> ApproveExercise(int exerciseId);
        public Task<List<Exercise>> GetApprovedExercises();

        public Task<List<Exercise>> GetApprovedExercisesByUserId(int userId);

        public Task<int> GetTotalExercisesByUserId(int userId);

        public Task<Dictionary<int, int>> GetTotalExercisesByUserIds(List<int> userIds);

        public Task<List<Exercise>> GetExercisesByKeyWord(string keyWord);

    }
}
