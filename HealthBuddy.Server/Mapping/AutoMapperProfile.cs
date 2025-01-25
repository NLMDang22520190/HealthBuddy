using AutoMapper;
using HealthBuddy.Server.Models.Domain;
using HealthBuddy.Server.Models.DTO.GET;

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

        }
    }
}