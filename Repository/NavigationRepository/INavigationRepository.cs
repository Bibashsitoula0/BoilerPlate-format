using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.NavigationRepository
{
    public interface INavigationRepository
    {
        Task<List<NavigationByRoleId>> GetNavigationByRoleId(string role_id);
        Task<List<Navigation>> GetNavigationByRole(string role_id);
        Task<int> SumbitNavigationRole(RoleNavigation navigation);
        Task DeleteNavigationByRoleId(string role_id);
    }
}
