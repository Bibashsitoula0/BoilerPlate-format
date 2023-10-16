using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class User
    {
        public string user_id { get; set; }
        public string user_name { get; set; }
        public string full_name { get; set; }
        public string phone_number { get; set; }

        [Required]
        public string user_role { get; set; }
        
        [DataType(DataType.EmailAddress)]
        public string email { get; set; }
        public string? password { get; set; }
        public string? confirmpassword { get; set; }

    }
}
