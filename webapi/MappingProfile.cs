using AutoMapper;
using DTO;
using Model;

namespace webapi
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<UserDto, ApplicationUserVm>();
            CreateMap<LoginDto, LoginVm>();
            CreateMap<RegisterList, UserListDto>();
            CreateMap<Navigation, NavigationDto>();
            CreateMap<UserPasswordDto, UserPassword>();
            CreateMap<ChangePasswordDto, ChangePassword>();
        }
    }
}
