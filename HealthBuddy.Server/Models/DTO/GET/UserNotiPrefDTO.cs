namespace HealthBuddy.Server.Models.DTO.GET
{
    public class UserNotiPrefDTO
    {
        public int UserId { get; set; }

        public bool FoodNoti { get; set; }

        public bool ExerciseNoti { get; set; }

        public bool WorkoutScheduleNoti { get; set; }

        public bool MealScheduleNoti { get; set; }
    }
}