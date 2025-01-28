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
            CreateMap<Recipe, Models.DTO.RecipeDTO>().ReverseMap();
            CreateMap<Food, FoodDTO>().ReverseMap();
            CreateMap<Recipe, Models.DTO.GET.RecipeDTO>().ReverseMap();
            CreateMap<Food, AddFoodRequestDTO>().ReverseMap();
            CreateMap<User, UserPostedDTO>().ReverseMap();
            CreateMap<PostDTO, Food>()
               .ForMember(dest => dest.FoodId, opt => opt.MapFrom(src => src.PostId)) // Map PostId sang FoodId
               .ForMember(dest => dest.FoodName, opt => opt.MapFrom(src => src.Title)).ReverseMap()
               .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.FoodId)) // Map FoodId sang PostId
               .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.FoodName)); // Map FoodName sang Title // Map Title sang FoodName
        }
    }
}