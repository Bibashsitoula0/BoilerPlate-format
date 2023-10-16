
using AutoMapper;
using DTO;
using Microsoft.AspNetCore.Mvc;
using Model;
using Service.CurrentUserService;
using Service.NavigationService;

namespace webapi.Controllers.NavigationController
{  
    public class NavigationController : AuthorizeController        
        {
        public readonly IMapper _mapper;
        public readonly ICurrentUserService _currentUserService;
        private readonly INavigationService _navigationService;      
        public NavigationController(INavigationService navigation, ICurrentUserService currentUserService, IMapper mapper) :base(mapper, currentUserService)
        {
            _navigationService = navigation;
            _currentUserService = currentUserService;
            _mapper = mapper;       
        }
          
       [HttpGet] 
       public async Task<Response<List<NavigationByRoleId>>> GetNavigationByRoleId(string roleID)
    {
        var data = await _navigationService.GetNavigationByRoleId(roleID);
        return Message.SucessWithData("Get Navigation By Role Id ", data);     
    }

       [HttpPost]  
        public async Task<Response<NavigationByRoleId>> SubmitNavigationRole([FromBody]List<NavigationByRoleId> navigation)
    {
        await _navigationService.SumbitNavigationRole(navigation);        
         return Message.Sucess("Navigation Role Saved", (NavigationByRoleId)null);       
    }

       [HttpGet]
       public async Task<object> GetNavigationByRole(string roleId)
        {
            try
            {
                 if (_currentUserService == null || _currentUserService.UserId == null) return Message.Error("UserID is null",(List<NavigationDto>)null); 
                List<Navigation> navigations = new List<Navigation>();
                var nav = await _navigationService.GetNavigationByRole(roleId);
                navigations = nav.Where(x => x.parent_navigation_id == 0 & x.root_navigation_id == 0).OrderBy(x => x.display_order).ToList();
                foreach (var item in navigations)
                {
                    var childNav = nav.Where(x => x.parent_navigation_id == item.navigation_id).ToList();
                    item.children = childNav;
                    foreach (var child in childNav)
                    {
                        var grandChildNav = nav.Where(x => x.parent_navigation_id == child.navigation_id).ToList();
                        child.children = grandChildNav;
                    }
                }
                var navdto = _mapper.Map<List<Navigation>, List<NavigationDto>>(navigations);
                return Message.SucessWithData("Sucessfully", navdto);

            }
            catch (Exception e)
            {
                return Message.Error(e.Message.ToString(), (List<NavigationDto>)null);
            }
        }
    }
}
