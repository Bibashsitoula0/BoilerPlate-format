using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class UserWithNavigation
    {
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string role { get; set; }
        public string email { get; set; }
        public string displayname { get; set; }
        public List<Navigation> Navigations { get; set; }
    }
}
