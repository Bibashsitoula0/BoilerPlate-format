using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Model;
using Repository.AccountRepository;
using Repository.CommonRepository;
using Repository.DapperConfigure;
using Repository.NavigationRepository;
using Service.AccountService;
using Service.CommonService;
using Service.CurrentUserService;
using Service.NavigationService;
using webapi.Data;

namespace webapi
{
    public static  class RegisterDependencyInjection
    {
        public static WebApplicationBuilder UseArhApiConfig(this WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddTransient<IDataAccessLayer, DataAccessLayer>();
            builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            builder.Services.AddTransient<IDataAccessLayer, DataAccessLayer>();
            builder.Services.AddScoped<IAccountService, AccountService>();
            builder.Services.AddScoped<IAccountRepository, AccountRepository>();
            builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
            builder.Services.AddScoped<INavigationService,NavigationService>();          
            builder.Services.AddScoped<INavigationRepository, NavigationRepository>();
            builder.Services.AddScoped<ICommonService, CommonService>();
            builder.Services.AddScoped<ICommonRepository,CommonRepository>();

            return builder;
        }
    }
}
