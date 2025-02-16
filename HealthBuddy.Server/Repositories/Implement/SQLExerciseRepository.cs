using System.Diagnostics;
using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLExerciseRepository : HealthBuddyRepository<Exercise>, IExerciseRepository
    {
        private readonly DbContextOptions<HealthBuddyDbContext> _dbContextOptions;
        public SQLExerciseRepository(HealthBuddyDbContext dbContext, DbContextOptions<HealthBuddyDbContext> dbContextOptions) : base(dbContext)
        {
            _dbContextOptions = dbContextOptions;
        }

        public async Task<Exercise> ApproveExercise(int exerciseId)
        {
            var exercise = await dbContext.Exercises
                           .Include(e => e.ExerciseTypes)
                           .Include(e => e.MuscleTypes)
                           .FirstOrDefaultAsync(e => e.ExerciseId == exerciseId);

            if (exercise == null)
            {
                return null; // Trả về null nếu không tìm thấy
            }

            exercise.IsApproved = true;

            foreach (var exerciseType in exercise.ExerciseTypes)
            {
                exerciseType.IsApproved = true;
            }

            foreach (var muscleType in exercise.MuscleTypes)
            {
                muscleType.IsApproved = true;
            }

            await dbContext.SaveChangesAsync();
            return exercise;
        }

        public async Task<List<Exercise>> GetApprovedExercises()
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                var result = await dbContext.Exercises
                    .Where(e => e.IsApproved == true && e.IsHidden == false)
                    .Include(e => e.Uploader)
                    .Include(e => e.ExerciseTypes)
                    .Include(e => e.MuscleTypes).AsNoTracking()
                    .ToListAsync();

                return result;
            }
        }

        public async Task<List<Exercise>> GetApprovedExercisesByUserId(int userId)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.Exercises.Where(e => e.UploaderId == userId && e.IsApproved == true && e.IsHidden == false)
                                .Include(e => e.Uploader).Include(e => e.ExerciseTypes)
                .Include(e => e.MuscleTypes).AsNoTracking().ToListAsync();
            }
        }

        public async Task<Exercise> GetExerciseById(int exerciseId)
        {
            return await dbContext.Exercises
            .Include(e => e.ExerciseTypes)
            .Include(e => e.MuscleTypes)
            .FirstOrDefaultAsync(e => e.ExerciseId == exerciseId);
        }

        public async Task<List<Exercise>> GetExercisesByKeyWord(string keyWord)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                var result = await dbContext.Exercises
                    .Where(e => (e.ExerciseName.Contains(keyWord) || e.Description.Contains(keyWord))
                    && e.IsApproved == true && e.IsHidden == false)
                    .Include(e => e.Uploader)
                    .Include(e => e.ExerciseTypes)
                    .Include(e => e.MuscleTypes).AsNoTracking()
                    .ToListAsync();
                return result;
            }
        }

        public async Task<int> GetTotalExercisesByUserId(int userId)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.Exercises.Where(e => e.UploaderId == userId).AsNoTracking().CountAsync();
            }
        }

        public async Task<Dictionary<int, int>> GetTotalExercisesByUserIds(List<int> userIds)
        {
            using (var dbContext = new HealthBuddyDbContext(_dbContextOptions))
            {
                return await dbContext.Exercises
                            .Where(e => userIds.Contains(e.UploaderId))
                            .GroupBy(e => e.UploaderId)
                            .Select(g => new { UserId = g.Key, Count = g.Count() }).AsNoTracking()
                            .ToDictionaryAsync(g => g.UserId, g => g.Count);
            }
        }

        public async Task UpdateExerciseComments(int exerciseId, int newComments)
        {
            var exercise = await dbContext.Exercises.FirstOrDefaultAsync(e => e.ExerciseId == exerciseId);
            if (exercise != null)
            {
                exercise.NumberOfComments += newComments;
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task UpdateExerciseLikes(int exerciseId, int newLikes)
        {
            var exercise = await dbContext.Exercises.FirstOrDefaultAsync(e => e.ExerciseId == exerciseId);
            if (exercise != null)
            {
                exercise.NumberOfLikes += newLikes;
                await dbContext.SaveChangesAsync();
            }
        }
    }
}
