using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.AccountService
{
    public interface IAccountService
    {
        Task<List<RegisterList>> GetUser(int? pageNumber, int? pageSize, string? SearchString);
        Task<bool> DeleteUser(string Id);
    }
}
