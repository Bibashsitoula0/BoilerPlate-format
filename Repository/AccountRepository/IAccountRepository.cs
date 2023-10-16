using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.AccountRepository
{
    public interface IAccountRepository
    {
        Task<List<RegisterList>> GetUser(int? pageNumber, int? pageSize, string? SearchString);
        Task<bool> DeleteUser(string Id);
    }
}
