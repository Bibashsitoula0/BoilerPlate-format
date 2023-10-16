using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Model;
using Repository.AccountRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;      

        public AccountService(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;         
                    
        }

        public async Task<List<RegisterList>> GetUser(int? pageNumber, int? pageSize, string? SearchString)             
        {
            SearchString = SearchString.ToLower();
            var data = await _accountRepository.GetUser(pageNumber, pageSize, SearchString);
            return data;
        }
        public async Task<bool> DeleteUser(string Id)
        {
            return await _accountRepository.DeleteUser(Id);
        }
    }
}
