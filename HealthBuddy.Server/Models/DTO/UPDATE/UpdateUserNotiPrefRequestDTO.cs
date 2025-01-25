namespace HealthBuddy.Server.Models.DTO.UPDATE
{
    public class UpdateUserNotiPrefRequestDTO
    {
        public int UserId { get; set; }

        public bool FoodNoti { get; set; }

        public bool ExerciseNoti { get; set; }

        public bool WorkoutScheduleNoti { get; set; }

        public bool MealScheduleNoti { get; set; }
    }
}