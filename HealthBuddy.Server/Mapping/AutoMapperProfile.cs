using AutoMapper;
using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO;
using HealthBuddy.Server.Models.DTO.ADD;
using HealthBuddy.Server.Models.DTO.GET;
using HealthBuddy.Server.Models.DTO.UPDATE;

namespace HealthBuddy.Server.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserProfileInfoDTO>().ReverseMap();
            CreateMap<UserDetail, UserDetailDTO>().ReverseMap();
            CreateMap<UserNotificationPreference, UserNotiPrefDTO>().ReverseMap();
            CreateMap<User, UpdateUserRequestDTO>().ReverseMap();
            CreateMap<UserDetail, UpdateUserDetailRequestDTO>().ReverseMap();
            CreateMap<UserNotificationPreference, UpdateUserNotiPrefRequestDTO>().ReverseMap();
            CreateMap<FoodType, AddFoodTypeRequestDTO>().ReverseMap();
            CreateMap<Ingredient, AddIngreRequestDTO>().ReverseMap();
            CreateMap<FoodType, FoodTypeDTO>().ReverseMap();
            CreateMap<Ingredient, IngredientDTO>().ReverseMap();
            CreateMap<Recipe, Models.DTO.RecipeDTO>().ReverseMap();
            CreateMap<Food, FoodDTO>().ReverseMap();
            CreateMap<Recipe, Models.DTO.GET.RecipeDTO>().ReverseMap();
            CreateMap<Food, AddFoodRequestDTO>().ReverseMap();
            CreateMap<User, UserPostedDTO>().ReverseMap();
            CreateMap<PostDTO, Food>()
               .ForMember(dest => dest.FoodId, opt => opt.MapFrom(src => src.PostId)) // Map PostId sang FoodId
               .ForMember(dest => dest.FoodName, opt => opt.MapFrom(src => src.Title)).ReverseMap()
               .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.FoodId)) // Map FoodId sang PostId
               .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.FoodName)) // Map FoodName sang Title // Map Title sang FoodName
                .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.FoodTypes.Select(ft => new TagDTO
                {
                    TagId = ft.FoodTypeId,
                    TagName = ft.FoodTypeName,
                    TagType = "FoodType"
                }).ToList())); // Chuyển danh sách FoodType thành TagDTO
            CreateMap<PostDTO, Exercise>()
               .ForMember(dest => dest.ExerciseId, opt => opt.MapFrom(src => src.PostId)) // Map PostId sang ExerciseId
               .ForMember(dest => dest.ExerciseName, opt => opt.MapFrom(src => src.Title)).ReverseMap()
               .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.ExerciseId)) // Map ExerciseId sang PostId
               .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.ExerciseName)) // Map ExerciseName sang Title // Map Title sang ExerciseName
                .ForMember(dest => dest.Tags, opt => opt.MapFrom(src =>
                    src.ExerciseTypes.Select(et => new TagDTO
                    {
                        TagId = et.ExerciseTypeId,
                        TagName = et.ExerciseName,
                        TagType = "ExerciseType"
                    })
                    .Union(src.MuscleTypes.Select(mt => new TagDTO
                    {
                        TagId = mt.MuscleTypeId,
                        TagName = mt.MuscleTypeName,
                        TagType = "MuscleType"
                    }))
                .ToList())); // Chuyển ExerciseType và MuscleType thành TagDTO
            CreateMap<PostDTO, WorkoutSchedule>()
               .ForMember(dest => dest.WorkoutScheduleId, opt => opt.MapFrom(src => src.PostId)) // Map PostId sang WorkoutScheduleId
               .ForMember(dest => dest.WorkOutName, opt => opt.MapFrom(src => src.Title)).ReverseMap()
               .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.WorkoutScheduleId)) // Map WorkoutScheduleId sang PostId
               .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.WorkOutName)); // Map WorkoutScheduleName sang Title

            CreateMap<PostDTO, MealSchedule>()
               .ForMember(dest => dest.MealScheduleId, opt => opt.MapFrom(src => src.PostId)) // Map PostId sang MealScheduleId
               .ForMember(dest => dest.MealName, opt => opt.MapFrom(src => src.Title)).ReverseMap()
               .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.MealScheduleId)) // Map MealScheduleId sang PostId
               .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.MealName)); // Map MealScheduleName sang Title

            CreateMap<MuscleType, MuscleTypeDTO>().ReverseMap();
            CreateMap<ExerciseType, ExerciseTypeDTO>().ReverseMap();
            CreateMap<ExerciseType, AddExerciseTypeRequestDTO>().ReverseMap();
            CreateMap<MuscleType, AddMuscleTypeRequestDTO>().ReverseMap();
            CreateMap<Exercise, ExerciseDTO>().ReverseMap();
            CreateMap<Exercise, AddExerciseRequestDTO>().ReverseMap();
            CreateMap<Like, AddLikeRequestDTO>().ReverseMap();
            CreateMap<Comment, CommentDTO>().ReverseMap();
            CreateMap<Comment, AddCommentRequestDTO>().ReverseMap();
            CreateMap<Food, FoodForScheduleDTO>().ReverseMap();
            CreateMap<Exercise, ExerciseForScheduleDTO>().ReverseMap();
            CreateMap<MealSchedule, MealScheduleDTO>().ReverseMap();
            CreateMap<MealSchedule, AddMealScheduleRequestDTO>().ReverseMap();
            CreateMap<MealDetail, MealDetailDTO>().ReverseMap();
            CreateMap<MealDetail, AddMealDetailRequestDTO>().ReverseMap();
            CreateMap<WorkoutSchedule, WorkoutScheduleDTO>().ReverseMap();
            CreateMap<WorkoutSchedule, AddWorkoutScheduleRequestDTO>().ReverseMap();
            CreateMap<WorkoutDetail, WorkoutDetailDTO>().ReverseMap();
            CreateMap<WorkoutDetail, AddWorkoutDetailRequestDTO>().ReverseMap();
            CreateMap<UserMealTracking, FollowMealScheduleRequestDTO>().ReverseMap();
            CreateMap<UserWorkoutTracking, FollowWorkoutScheduleRequestDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();

            // UserPreference mappings
            CreateMap<UserPreference, UserPreferenceDTO>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.Username))
                .ReverseMap();
            CreateMap<UserPreference, AddUserPreferenceRequestDTO>().ReverseMap();
            CreateMap<UserPreference, UpdateUserPreferenceRequestDTO>().ReverseMap();
        }
    }
}