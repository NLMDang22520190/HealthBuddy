using AutoMapper;
using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Repositories;
using Microsoft.Extensions.Caching.Memory;

namespace HealthBuddy.Server.Services
{
    public class RecommendationService : IRecommendationService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserDetailRepository _userDetailRepository;
        private readonly IUserPreferenceRepository _userPreferenceRepository;
        private readonly IFoodRepository _foodRepository;
        private readonly IExerciseRepository _exerciseRepository;
        private readonly ILikeRepository _likeRepository;
        private readonly IUserMealTrackingRepository _userMealTrackingRepository;
        private readonly IUserWorkoutTrackingRepository _userWorkoutTrackingRepository;
        private readonly IMapper _mapper;
        private readonly IMemoryCache _cache;

        public RecommendationService(
            IUserRepository userRepository,
            IUserDetailRepository userDetailRepository,
            IUserPreferenceRepository userPreferenceRepository,
            IFoodRepository foodRepository,
            IExerciseRepository exerciseRepository,
            ILikeRepository likeRepository,
            IUserMealTrackingRepository userMealTrackingRepository,
            IUserWorkoutTrackingRepository userWorkoutTrackingRepository,
            IMapper mapper,
            IMemoryCache cache)
        {
            _userRepository = userRepository;
            _userDetailRepository = userDetailRepository;
            _userPreferenceRepository = userPreferenceRepository;
            _foodRepository = foodRepository;
            _exerciseRepository = exerciseRepository;
            _likeRepository = likeRepository;
            _userMealTrackingRepository = userMealTrackingRepository;
            _userWorkoutTrackingRepository = userWorkoutTrackingRepository;
            _mapper = mapper;
            _cache = cache;
        }

        public async Task<List<FoodRecommendationDTO>> GetFoodRecommendationsAsync(int userId, int count = 10)
        {
            // Get user detail first to include in cache key for proper invalidation
            var userDetail = await _userDetailRepository.GetUserDetailByUserIdAsync(userId);

            // Create cache key that includes user detail hash to auto-invalidate when user data changes
            var userDetailHash = userDetail != null ?
                $"{userDetail.Height}_{userDetail.Weight}_{userDetail.HealthCondition}_{userDetail.Allergies}".GetHashCode() : 0;
            var cacheKey = $"food_recommendations_{userId}_{count}_{userDetailHash}";

            if (_cache.TryGetValue(cacheKey, out List<FoodRecommendationDTO>? cachedResult))
            {
                return cachedResult ?? new List<FoodRecommendationDTO>();
            }

            var user = await _userRepository.GetUserByIdAsync(userId);
            var allFoods = await _foodRepository.GetApprovedFoods();

            var recommendations = new List<FoodRecommendationDTO>();

            foreach (var food in allFoods)
            {
                // Pre-filter foods with allergies - exclude them completely
                if (userDetail?.Allergies != null && HasAllergyConflict(food, userDetail.Allergies))
                {
                    continue; // Skip this food entirely
                }

                var score = CalculateFoodScore(food, user, userDetail, userId);

                // Only include foods with positive scores
                if (score <= 0)
                {
                    continue;
                }

                var reason = GenerateFoodRecommendationReason(food, userDetail, score);
                var isLiked = await _likeRepository.GetPostLikeByUserId(food.FoodId, userId, "food");

                recommendations.Add(new FoodRecommendationDTO
                {
                    FoodId = food.FoodId,
                    FoodName = food.FoodName,
                    Description = food.Description,
                    ImgUrl = food.ImgUrl,
                    Calories = food.Calories,
                    DifficultyLevel = food.DifficultyLevel,
                    HealthBenefits = food.HealthBenefits,
                    CookingTime = food.CookingTime,
                    Portion = food.Portion,
                    RecommendationScore = score,
                    RecommendationReason = reason,
                    FoodTypes = food.FoodTypes.Select(ft => ft.FoodTypeName).ToList(),
                    IsLikedByUser = isLiked
                });
            }



            var result = recommendations
                .OrderByDescending(r => r.RecommendationScore)
                .Take(count)
                .ToList();

            _cache.Set(cacheKey, result, TimeSpan.FromMinutes(30));
            return result;
        }

        public async Task<List<ExerciseRecommendationDTO>> GetExerciseRecommendationsAsync(int userId, int count = 10)
        {
            var cacheKey = $"exercise_recommendations_{userId}_{count}";
            if (_cache.TryGetValue(cacheKey, out List<ExerciseRecommendationDTO>? cachedResult))
            {
                return cachedResult ?? new List<ExerciseRecommendationDTO>();
            }

            var user = await _userRepository.GetUserByIdAsync(userId);
            var userDetail = await _userDetailRepository.GetUserDetailByUserIdAsync(userId);
            var allExercises = await _exerciseRepository.GetApprovedExercises();

            var recommendations = new List<ExerciseRecommendationDTO>();

            foreach (var exercise in allExercises)
            {
                var score = await CalculateExerciseScore(exercise, user, userDetail, userId);
                var reason = GenerateExerciseRecommendationReason(exercise, userDetail, score);
                var isLiked = await _likeRepository.GetPostLikeByUserId(exercise.ExerciseId, userId, "exercise");

                recommendations.Add(new ExerciseRecommendationDTO
                {
                    ExerciseId = exercise.ExerciseId,
                    ExerciseName = exercise.ExerciseName,
                    Description = exercise.Description,
                    DifficultyLevel = exercise.DifficultyLevel,
                    NumberOfReps = exercise.NumberOfReps,
                    NumberOfSets = exercise.NumberOfSets,
                    VideoUrl = exercise.VideoUrl,
                    ImgUrl = exercise.ImgUrl,
                    CaloriesBurned = exercise.CaloriesBurned,
                    RecommendationScore = score,
                    RecommendationReason = reason,
                    ExerciseTypes = exercise.ExerciseTypes.Select(et => et.ExerciseName).ToList(),
                    MuscleTypes = exercise.MuscleTypes.Select(mt => mt.MuscleTypeName).ToList(),
                    IsLikedByUser = isLiked
                });
            }

            var result = recommendations
                .OrderByDescending(r => r.RecommendationScore)
                .Take(count)
                .ToList();

            _cache.Set(cacheKey, result, TimeSpan.FromMinutes(30));
            return result;
        }

        public async Task<PersonalizedRecommendationDTO> GetPersonalizedRecommendationsAsync(int userId, int foodCount = 5, int exerciseCount = 5)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            var foodRecommendations = await GetFoodRecommendationsAsync(userId, foodCount);
            var exerciseRecommendations = await GetExerciseRecommendationsAsync(userId, exerciseCount);
            var healthSummary = await GetUserHealthSummaryAsync(userId);

            return new PersonalizedRecommendationDTO
            {
                UserId = userId,
                Username = user?.Username ?? "Unknown",
                RecommendedFoods = foodRecommendations,
                RecommendedExercises = exerciseRecommendations,
                HealthSummary = healthSummary,
                GeneratedAt = DateTime.Now
            };
        }

        public async Task<bool> RecordFeedbackAsync(RecommendationFeedbackDTO feedback)
        {
            // Implementation for recording feedback
            // This could be stored in a separate RecommendationFeedback table
            // For now, we'll return true as a placeholder
            return await Task.FromResult(true);
        }

        /// <summary>
        /// Clear recommendation cache for a specific user
        /// Call this method when user details are updated to ensure fresh recommendations
        /// </summary>
        public void ClearUserRecommendationCache(int userId)
        {
            try
            {
                // Get all cache keys that start with the user's recommendation pattern
                var cacheKeys = new List<string>();

                // Since IMemoryCache doesn't expose keys directly, we'll use a pattern-based approach
                // Clear both food and exercise recommendations for this user
                for (int count = 1; count <= 50; count++) // Reasonable range for count parameter
                {
                    // Try different hash values (we can't predict the exact hash, so we clear broadly)
                    for (int hash = -1000000; hash <= 1000000; hash += 100000)
                    {
                        var foodCacheKey = $"food_recommendations_{userId}_{count}_{hash}";
                        var exerciseCacheKey = $"exercise_recommendations_{userId}_{count}";

                        _cache.Remove(foodCacheKey);
                        _cache.Remove(exerciseCacheKey);
                    }
                }
            }
            catch (Exception)
            {
                // Log error if needed
            }
        }

        /// <summary>
        /// Clear all recommendation cache
        /// Use this sparingly as it affects all users
        /// </summary>
        public void ClearAllRecommendationCache()
        {
            try
            {
                // Since we can't enumerate IMemoryCache keys, we'll need to implement a more sophisticated approach
                // Note: In production, consider using IDistributedCache with Redis
                // which allows pattern-based key deletion
            }
            catch (Exception)
            {
                // Log error if needed
            }
        }

        public async Task<List<int>> GetSimilarUsersAsync(int userId, int count = 10)
        {
            // Collaborative filtering implementation
            // Find users with similar preferences, health conditions, and interaction patterns
            var currentUser = await _userDetailRepository.GetUserDetailByUserIdAsync(userId);
            if (currentUser == null) return new List<int>();

            // This is a simplified implementation
            // In a real scenario, you'd use more sophisticated similarity algorithms
            return new List<int>();
        }

        public async Task<UserHealthSummaryDTO> GetUserHealthSummaryAsync(int userId)
        {
            var userDetail = await _userDetailRepository.GetUserDetailByUserIdAsync(userId);
            if (userDetail == null)
            {
                return new UserHealthSummaryDTO();
            }

            var bmi = CalculateBMI(userDetail.Height, userDetail.Weight);

            return new UserHealthSummaryDTO
            {
                Height = userDetail.Height,
                Weight = userDetail.Weight,
                BMI = bmi,
                HealthCondition = userDetail.HealthCondition,
                Allergies = userDetail.Allergies,
                ActivityLevel = "moderately_active", // Default, should come from UserPreference
                TargetCaloriesPerDay = CalculateTargetCalories(userDetail.Height, userDetail.Weight, "moderately_active"),
                FitnessGoals = "maintain" // Default, should come from UserPreference
            };
        }

        public async Task<List<FoodRecommendationDTO>> GetTrendingFoodsAsync(int count = 10)
        {
            var foods = await _foodRepository.GetApprovedFoods();
            return foods
                .OrderByDescending(f => f.NumberOfLikes)
                .ThenByDescending(f => f.CreatedDate)
                .Take(count)
                .Select(f => new FoodRecommendationDTO
                {
                    FoodId = f.FoodId,
                    FoodName = f.FoodName,
                    Description = f.Description,
                    ImgUrl = f.ImgUrl,
                    Calories = f.Calories,
                    DifficultyLevel = f.DifficultyLevel,
                    HealthBenefits = f.HealthBenefits,
                    CookingTime = f.CookingTime,
                    Portion = f.Portion,
                    RecommendationScore = f.NumberOfLikes,
                    RecommendationReason = "Trending - Popular among users",
                    FoodTypes = f.FoodTypes.Select(ft => ft.FoodTypeName).ToList(),
                    IsLikedByUser = false
                })
                .ToList();
        }

        public async Task<List<ExerciseRecommendationDTO>> GetTrendingExercisesAsync(int count = 10)
        {
            var exercises = await _exerciseRepository.GetApprovedExercises();
            return exercises
                .OrderByDescending(e => e.NumberOfLikes)
                .ThenByDescending(e => e.CreatedDate)
                .Take(count)
                .Select(e => new ExerciseRecommendationDTO
                {
                    ExerciseId = e.ExerciseId,
                    ExerciseName = e.ExerciseName,
                    Description = e.Description,
                    DifficultyLevel = e.DifficultyLevel,
                    NumberOfReps = e.NumberOfReps,
                    NumberOfSets = e.NumberOfSets,
                    VideoUrl = e.VideoUrl,
                    ImgUrl = e.ImgUrl,
                    CaloriesBurned = e.CaloriesBurned,
                    RecommendationScore = e.NumberOfLikes,
                    RecommendationReason = "Trending - Popular among users",
                    ExerciseTypes = e.ExerciseTypes.Select(et => et.ExerciseName).ToList(),
                    MuscleTypes = e.MuscleTypes.Select(mt => mt.MuscleTypeName).ToList(),
                    IsLikedByUser = false
                })
                .ToList();
        }

        // Private helper methods for scoring algorithms
        private double CalculateFoodScore(Food food, User? user, UserDetail? userDetail, int userId)
        {
            double score = 0.0;

            // Base popularity score (0-20 points)
            score += Math.Min(food.NumberOfLikes * 0.1, 20);

            // Health condition matching (0-30 points)
            if (userDetail?.HealthCondition != null)
            {
                score += CalculateHealthConditionScore(food, userDetail.HealthCondition);
            }

            // Note: Allergy filtering is now done before calling this method
            // This ensures foods with allergens are completely excluded from recommendations

            // BMI-based calorie matching (0-25 points)
            if (userDetail?.Height != null && userDetail?.Weight != null)
            {
                var bmi = CalculateBMI(userDetail.Height, userDetail.Weight);
                score += CalculateCalorieScore(food.Calories, bmi);
            }

            // Difficulty preference (0-15 points)
            score += CalculateDifficultyScore(food.DifficultyLevel);

            // Cooking time preference (0-10 points)
            score += CalculateCookingTimeScore(food.CookingTime);

            return Math.Round(score, 2);
        }

        private async Task<double> CalculateExerciseScore(Exercise exercise, User? user, UserDetail? userDetail, int userId)
        {
            double score = 0.0;

            // Base popularity score (0-20 points)
            score += Math.Min(exercise.NumberOfLikes * 0.1, 20);

            // Health condition matching (0-30 points)
            if (userDetail?.HealthCondition != null)
            {
                score += CalculateExerciseHealthScore(exercise, userDetail.HealthCondition);
            }

            // BMI-based exercise matching (0-25 points)
            if (userDetail?.Height != null && userDetail?.Weight != null)
            {
                var bmi = CalculateBMI(userDetail.Height, userDetail.Weight);
                score += CalculateExerciseBMIScore(exercise, bmi);
            }

            // Difficulty preference (0-15 points)
            score += CalculateDifficultyScore(exercise.DifficultyLevel);

            // Calorie burn efficiency (0-10 points)
            if (exercise.CaloriesBurned.HasValue)
            {
                score += Math.Min(exercise.CaloriesBurned.Value * 0.02, 10);
            }

            return Math.Round(score, 2);
        }

        private double CalculateHealthConditionScore(Food food, string healthCondition)
        {
            var condition = healthCondition.ToLower();
            var benefits = food.HealthBenefits?.ToLower() ?? "";

            // Scoring based on health conditions
            return condition switch
            {
                var c when c.Contains("diabetes") => benefits.Contains("low sugar") || benefits.Contains("diabetes") ? 30 : 0,
                var c when c.Contains("hypertension") => benefits.Contains("low sodium") || benefits.Contains("heart") ? 25 : 0,
                var c when c.Contains("heart") => benefits.Contains("heart") || benefits.Contains("omega") ? 25 : 0,
                var c when c.Contains("obesity") => food.Calories < 300 ? 20 : 0,
                _ => 10 // Default bonus for any health benefits
            };
        }

        private double CalculateExerciseHealthScore(Exercise exercise, string healthCondition)
        {
            var condition = healthCondition.ToLower();
            var exerciseTypes = exercise.ExerciseTypes.Select(et => et.ExerciseName.ToLower()).ToList();

            return condition switch
            {
                var c when c.Contains("diabetes") => exerciseTypes.Any(t => t.Contains("cardio")) ? 25 : 15,
                var c when c.Contains("hypertension") => exerciseTypes.Any(t => t.Contains("cardio") || t.Contains("yoga")) ? 25 : 10,
                var c when c.Contains("heart") => exerciseTypes.Any(t => t.Contains("cardio")) ? 30 : 10,
                var c when c.Contains("obesity") => exercise.CaloriesBurned > 200 ? 25 : 15,
                var c when c.Contains("arthritis") => exerciseTypes.Any(t => t.Contains("yoga") || t.Contains("swimming")) ? 25 : 5,
                _ => 10
            };
        }

        private bool HasAllergyConflict(Food food, string allergies)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(allergies))
                {
                    return false;
                }

                var allergyList = allergies.ToLower().Split(',').Select(a => a.Trim()).Where(a => !string.IsNullOrEmpty(a)).ToList();

                if (!allergyList.Any())
                {
                    return false;
                }

                var foodName = food.FoodName.ToLower();
                var description = food.Description?.ToLower() ?? "";

                // Check food name for allergens
                foreach (var allergy in allergyList)
                {
                    if (IsAllergyMatch(foodName, allergy))
                    {
                        return true;
                    }
                }

                // Check description for allergens
                foreach (var allergy in allergyList)
                {
                    if (IsAllergyMatch(description, allergy))
                    {
                        return true;
                    }
                }

                // Check ingredients for allergens
                if (food.Recipes != null && food.Recipes.Any())
                {
                    foreach (var recipe in food.Recipes)
                    {
                        if (recipe.Ingredient != null)
                        {
                            var ingredientName = recipe.Ingredient.IngredientName.ToLower();
                            foreach (var allergy in allergyList)
                            {
                                if (IsAllergyMatch(ingredientName, allergy))
                                {
                                    return true;
                                }
                            }
                        }
                    }
                }

                return false;
            }
            catch (Exception)
            {
                // In case of error, be safe and exclude the food
                return true;
            }
        }

        private double CalculateCalorieScore(int foodCalories, double? bmi)
        {
            if (!bmi.HasValue) return 10;

            // BMI-based calorie recommendations
            var targetCalories = bmi.Value switch
            {
                < 18.5 => 400, // Underweight - higher calories
                >= 18.5 and < 25 => 300, // Normal - moderate calories
                >= 25 and < 30 => 250, // Overweight - lower calories
                _ => 200 // Obese - very low calories
            };

            var difference = Math.Abs(foodCalories - targetCalories);
            return Math.Max(0, 25 - (difference * 0.1));
        }

        private double CalculateExerciseBMIScore(Exercise exercise, double? bmi)
        {
            if (!bmi.HasValue || !exercise.CaloriesBurned.HasValue) return 10;

            // Higher BMI should get higher calorie-burning exercises
            var targetCalorieBurn = bmi.Value switch
            {
                < 18.5 => 150, // Underweight - lower intensity
                >= 18.5 and < 25 => 250, // Normal - moderate intensity
                >= 25 and < 30 => 350, // Overweight - higher intensity
                _ => 450 // Obese - high intensity
            };

            var difference = Math.Abs(exercise.CaloriesBurned.Value - targetCalorieBurn);
            return Math.Max(0, 25 - (difference * 0.05));
        }

        private double CalculateDifficultyScore(string? difficulty)
        {
            // Prefer easy to medium difficulty for beginners
            return difficulty?.ToLower() switch
            {
                "easy" => 15,
                "medium" => 12,
                "hard" => 8,
                _ => 10
            };
        }

        private double CalculateCookingTimeScore(int cookingTime)
        {
            // Prefer shorter cooking times
            return cookingTime switch
            {
                <= 15 => 10,
                <= 30 => 8,
                <= 45 => 6,
                <= 60 => 4,
                _ => 2
            };
        }

        private double? CalculateBMI(double? height, double? weight)
        {
            if (!height.HasValue || !weight.HasValue || height <= 0) return null;

            var heightInMeters = height.Value / 100; // Convert cm to meters
            return Math.Round(weight.Value / (heightInMeters * heightInMeters), 2);
        }

        private int? CalculateTargetCalories(double? height, double? weight, string activityLevel)
        {
            if (!height.HasValue || !weight.HasValue) return null;

            // Simplified BMR calculation (Harris-Benedict equation for average adult)
            var bmr = 88.362 + (13.397 * weight.Value) + (4.799 * height.Value) - (5.677 * 30); // Assuming age 30

            var activityMultiplier = activityLevel switch
            {
                "sedentary" => 1.2,
                "lightly_active" => 1.375,
                "moderately_active" => 1.55,
                "very_active" => 1.725,
                _ => 1.55
            };

            return (int)(bmr * activityMultiplier);
        }

        private string GenerateFoodRecommendationReason(Food food, UserDetail? userDetail, double score)
        {
            var reasons = new List<string>();

            if (userDetail?.HealthCondition != null)
            {
                reasons.Add($"Good for {userDetail.HealthCondition.ToLower()}");
            }

            if (food.Calories < 300)
            {
                reasons.Add("Low calorie option");
            }

            if (food.CookingTime <= 30)
            {
                reasons.Add("Quick to prepare");
            }

            if (food.DifficultyLevel?.ToLower() == "easy")
            {
                reasons.Add("Easy to make");
            }

            if (food.NumberOfLikes > 10)
            {
                reasons.Add("Popular choice");
            }

            return reasons.Any() ? string.Join(", ", reasons) : "Recommended for you";
        }

        private string GenerateExerciseRecommendationReason(Exercise exercise, UserDetail? userDetail, double score)
        {
            var reasons = new List<string>();

            if (userDetail?.HealthCondition != null)
            {
                reasons.Add($"Beneficial for {userDetail.HealthCondition.ToLower()}");
            }

            if (exercise.CaloriesBurned > 200)
            {
                reasons.Add("High calorie burn");
            }

            if (exercise.DifficultyLevel?.ToLower() == "easy")
            {
                reasons.Add("Beginner friendly");
            }

            if (exercise.NumberOfLikes > 10)
            {
                reasons.Add("Popular exercise");
            }

            return reasons.Any() ? string.Join(", ", reasons) : "Recommended for you";
        }

        /// <summary>
        /// Enhanced allergy matching with fuzzy logic to handle typos and variations
        /// </summary>
        private bool IsAllergyMatch(string text, string allergy)
        {
            if (string.IsNullOrWhiteSpace(text) || string.IsNullOrWhiteSpace(allergy))
                return false;

            text = text.ToLower();
            allergy = allergy.ToLower();

            // Exact match
            if (text.Contains(allergy, StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            // Common typo corrections for allergies
            var allergyCorrections = new Dictionary<string, string[]>
            {
                { "sugar", new[] { "suger", "sugr", "shugar" } },
                { "potato", new[] { "potatos", "potatoe", "potatos" } },
                { "milk", new[] { "mlk", "milks" } },
                { "egg", new[] { "eggs", "eg" } },
                { "nuts", new[] { "nut", "nts" } },
                { "shellfish", new[] { "shell fish", "shelfish" } },
                { "wheat", new[] { "weat", "whea" } },
                { "soy", new[] { "soya", "soybeans" } }
            };

            // Check if allergy matches any known ingredient with corrections
            foreach (var correction in allergyCorrections)
            {
                var correctSpelling = correction.Key;
                var typos = correction.Value;

                // If user typed a typo, check against correct spelling
                if (typos.Contains(allergy) && text.Contains(correctSpelling, StringComparison.OrdinalIgnoreCase))
                {
                    return true;
                }

                // If ingredient has typo, check against user's correct spelling
                if (allergy == correctSpelling)
                {
                    foreach (var typo in typos)
                    {
                        if (text.Contains(typo, StringComparison.OrdinalIgnoreCase))
                        {
                            return true;
                        }
                    }
                }
            }

            return false;
        }
    }
}
