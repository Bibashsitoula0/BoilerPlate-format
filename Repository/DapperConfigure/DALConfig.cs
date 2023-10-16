using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DapperConfigure
{
    public class DALConfig
    {
        public static IConfiguration GetConfig()
        {
            var builder = new ConfigurationBuilder()
          .SetBasePath(Directory.GetCurrentDirectory())
          .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return builder.Build();
        }
        public IDbConnection GetDbConnection()
        {
            var settings = GetConfig();
            var connectionString = settings["ConnectionStrings:connection"];
            return new NpgsqlConnection(connectionString);
        }
    }
}
