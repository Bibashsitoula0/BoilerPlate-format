using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("navigation_role")]
    public class RoleNavigation
    {
        public int id { get; set; }
        public int navigation_id { get; set; }
        public string role_id { get; set; }
        public bool can_create { get; set; }
        public bool can_edit { get; set; }
        public bool can_review { get; set; }
        public bool can_allow { get; set; }
        public bool can_approve { get; set; }
        public bool can_delete { get; set; }
        public bool can_full_access { get; set; }
        public string created_by { get; set; }
        public DateTime created_date { get; set; }
        public string updated_by { get; set; }
        public DateTime updated_date { get; set; }
    }
}
