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
            //CreateMap<SignUpRequestDTO, SignUpRequest>();
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
            CreateMap<Recipe, RecipeDTO>().ReverseMap();
            CreateMap<Food, AddFoodRequestDTO>().ReverseMap();
        }
    }
}