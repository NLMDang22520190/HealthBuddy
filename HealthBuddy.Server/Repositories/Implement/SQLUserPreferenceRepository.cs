using HealthBuddy.Server.Models;
using HealthBuddy.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthBuddy.Server.Repositories.Implement
{
    public class SQLUserPreferenceRepository : HealthBuddyRepository<UserPreference>, IUserPreferenceRepository
    {
        public SQLUserPreferenceRepository(HealthBuddyDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<UserPreference?> GetUserPreferenceByUserIdAsync(int userId)
        {
            return await dbContext.UserPreferences
                .Include(up => up.User)
                .FirstOrDefaultAsync(up => up.UserId == userId);
        }

        public async Task<UserPreference> CreateOrUpdateUserPreferenceAsync(UserPreference userPreference)
        {
            var existingPreference = await GetUserPreferenceByUserIdAsync(userPreference.UserId);
            
            if (existingPreference != null)
            {
                // Update existing preference
                existingPreference.DietaryRestrictions = userPreference.DietaryRestrictions;
                existingPreference.PreferredCuisines = userPreference.PreferredCuisines;
                existingPreference.DislikedIngredients = userPreference.DislikedIngredients;
                existingPreference.MaxCookingTime = userPreference.MaxCookingTime;
                existingPreference.PreferredDifficultyLevel = userPreference.PreferredDifficultyLevel;
                existingPreference.TargetCaloriesPerMeal = userPreference.TargetCaloriesPerMeal;
                existingPreference.PreferredExerciseTypes = userPreference.PreferredExerciseTypes;
                existingPreference.PreferredMuscleGroups = userPreference.PreferredMuscleGroups;
                existingPreference.MaxWorkoutDuration = userPreference.MaxWorkoutDuration;
                existingPreference.FitnessGoals = userPreference.FitnessGoals;
                existingPreference.PreferredWorkoutTime = userPreference.PreferredWorkoutTime;
                existingPreference.FitnessLevel = userPreference.FitnessLevel;
                existingPreference.TargetWeight = userPreference.TargetWeight;
                existingPreference.TargetCaloriesPerDay = userPreference.TargetCaloriesPerDay;
                existingPreference.HealthGoals = userPreference.HealthGoals;
                existingPreference.ActivityLevel = userPreference.ActivityLevel;
                existingPreference.UpdatedDate = DateTime.Now;

                await dbContext.SaveChangesAsync();
                return existingPreference;
            }
            else
            {
                // Create new preference
                userPreference.CreatedDate = DateTime.Now;
                userPreference.UpdatedDate = DateTime.Now;
                
                await dbContext.UserPreferences.AddAsync(userPreference);
                await dbContext.SaveChangesAsync();
                return userPreference;
            }
        }

        public async Task<List<UserPreference>> GetUserPreferencesByHealthGoalsAsync(string healthGoals)
        {
            return await dbContext.UserPreferences
                .Include(up => up.User)
                .Where(up => up.HealthGoals != null && up.HealthGoals.Contains(healthGoals))
                .ToListAsync();
        }

        public async Task<List<UserPreference>> GetUserPreferencesByActivityLevelAsync(string activityLevel)
        {
            return await dbContext.UserPreferences
                .Include(up => up.User)
                .Where(up => up.ActivityLevel == activityLevel)
                .ToListAsync();
        }
    }
}
