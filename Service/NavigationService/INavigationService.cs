using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.NavigationService
{
    public interface INavigationService
    {
        Task<List<NavigationByRoleId>> GetNavigationByRoleId(string role_id);
        Task<List<Navigation>> GetNavigationByRole(string role_id);
        Task SumbitNavigationRole(List<NavigationByRoleId> navigation);
    }
}
