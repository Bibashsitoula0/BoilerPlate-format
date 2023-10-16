using Model;
using Repository.DapperConfigure;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.AccountRepository
{
    public class AccountRepository : DALConfig, IAccountRepository
    {
        public readonly IDataAccessLayer _dah;
        public AccountRepository(IDataAccessLayer dah)
        {
             _dah= dah;
        }

        public async Task<List<RegisterList>> GetUser(int? pageNumber, int? pageSize, string? SearchString)
        {
            string query = @"select * from fn_get_generaluser_list(@pageNumber,@pageSize,@searchString) ";
            var parameters = new { pageNumber = pageNumber, pageSize = pageSize, searchString = SearchString };
            var user = await _dah.FetchDerivedModelAsync<RegisterList>(query, parameters);
            return user;
           
        }
        public async Task<bool> DeleteUser(string userId)
        {
            string query = @"delete AspNetUsers where 
                        Id = @id                       
                ";
            var parameters = new
            {
                isActive = false,
                id = userId
            };
            var data = await _dah.FetchDerivedModelAsync<dynamic>(query, parameters);
            return true;
        }
    }
}
