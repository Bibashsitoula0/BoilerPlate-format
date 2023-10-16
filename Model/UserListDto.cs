using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class UserListDto
    {
        public string user_name { get; set; }
        public string Id { get; set; }
        public string full_name { get; set; }
        public string role { get; set; }
        public string email { get; set; }
        public string phone_number { get; set; }
        public bool is_active { get; set; }
        public int totalCount { get; set; }
    }
}
