using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class UserDto 
    {
        public string Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string fullName { get; set; } = string.Empty;
        public bool isactive { get; set; } 
        [DataType(DataType.EmailAddress)]
        public string email { get; set; } = string.Empty;
        public string? password { get; set; } = string.Empty;
        public string? confirmpassword { get; set; } = string.Empty;
        public string? role { get; set; } = string.Empty;
    }
}
