using Dapper;
using Dapper.Contrib.Extensions;
using Model;
using Repository.DapperConfigure;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.NavigationRepository
{
    public class NavigationRepository : DALConfig,INavigationRepository
    {
        public readonly IDataAccessLayer _dah;
        public NavigationRepository(IDataAccessLayer dah)
        {
            _dah = dah;
        }
        public async Task<List<NavigationByRoleId>> GetNavigationByRoleId(string role_id)
        {
            string query = @"select * from public.get_navigation_by_role_id(@RoleId)";
            var parameters = new { RoleId = role_id };
            var data = await _dah.FetchDerivedModelAsync<NavigationByRoleId>(query, parameters);
            return data;
        }

        public async Task<int> SumbitNavigationRole(RoleNavigation navigation)
        {
            using (IDbConnection db = GetDbConnection())
            {
                return await db.InsertAsync(navigation);
            }
        }
        public async Task DeleteNavigationByRoleId(string role_id)
        {
            using (IDbConnection db = GetDbConnection())
            {
                string query = @"delete from public.navigation_role where role_id = @role_id";
                var parameters = new { role_id = role_id };
                await db.ExecuteAsync(query, parameters);

            }
        }

        public async Task<List<Navigation>> GetNavigationByRole(string role_id)
        {
            string query = @"SELECT  NR.can_allow, NR.can_create,NR.can_review,NR.can_approve,NR.can_delete,NR.can_full_access,NR.can_approve,n.navigation_id,NR.role_id,
                            	N.navigation AS TITLE,
                            	N.link,
                            	N.navigation_type as type,
                            	N.parent_navigation_id,
                            	N.root_navigation_id,
                            	N.icon,
                            	N.display_order,
                            	N.showin_ui                                
                            from public.navigation N                            
                            left JOIN PUBLIC.navigation_role NR ON NR.navigation_id = N.navigation_id
                             WHERE NR.role_id = @RoleId ";
            var parameters = new { RoleId = role_id };
            var data = await _dah.FetchDerivedModelAsync<Navigation>(query, parameters);
            return data;
        }

    }
}
