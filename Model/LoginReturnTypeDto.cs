using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class LoginReturnTypeDto
    {
        public string userid { get; set; }
        public string Role { get; set; }
        public string RoleId { get; set; }
        public string jwt { get; set; }
        public string displayName { get; set; }
        public dynamic navigation { get; set; }
        public string email { get; set; }
    }
}
