using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Model;
using Repository.NavigationRepository;
using Service.CurrentUserService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IdentityModel.OidcConstants;

namespace Service.NavigationService
{
    public class NavigationService : INavigationService
    {
        private readonly INavigationRepository _navigationRepository;
        private readonly ICurrentUserService _currentUserService;   
     
        public NavigationService(INavigationRepository navigationRepository, ICurrentUserService currentUserService)
        {
            _navigationRepository = navigationRepository;
            _currentUserService = currentUserService;

        }
        public async Task SumbitNavigationRole(List<NavigationByRoleId> navigation)
        {

            if (navigation.Count == 0) return;
            NavigationByRoleId nav = navigation.First();
            await _navigationRepository.DeleteNavigationByRoleId(nav.role_id);

            foreach (var nr in navigation)
            {

                RoleNavigation toinsert = new RoleNavigation
                {
                    navigation_id = nr.navigation_id,
                    can_approve = nr.can_approve,
                    can_allow = nr.allowed,
                    can_delete = nr.can_delete,
                    can_edit = nr.can_edit,
                    can_create = nr.can_create,
                    can_full_access = nr.can_full_access,
                    can_review = nr.can_review,
                    role_id = nr.role_id,
                    created_date = DateTime.Now,
                    created_by = _currentUserService.UserId,
                    updated_date = DateTime.Now,
                    updated_by = _currentUserService.UserId
                };
                await _navigationRepository.SumbitNavigationRole(toinsert);

            }
        }
        public async Task<List<NavigationByRoleId>> GetNavigationByRoleId(string role_id)
        {
            var data = await _navigationRepository.GetNavigationByRoleId(role_id);
            return data;
        }

        public async Task<List<Model.Navigation>> GetNavigationByRole(string role_id)
        {
            var data = await _navigationRepository.GetNavigationByRole(role_id);
            var obj = data.Where(n => n.can_allow == true);
            return obj.ToList();
        }

    }
}
