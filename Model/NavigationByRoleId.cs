using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class NavigationByRoleId
    {
        public string role_id { get; set; }
        public string? parent_navigation { get; set; }
        public int navigation_id { get; set; }
        public bool allowed { get; set; }
        public string navigation { get; set; }
        public string? link { get; set; }
        public string? navigation_type { get; set; }
        public int? parent_navigation_id { get; set; }
        public int root_navigation_id { get; set; }
        public string icon { get; set; }
        public int display_order { get; set; }
        public bool can_approve { get; set; }
        public bool showin_ui { get; set; }
        public bool can_create { get; set; }
        public bool can_edit { get; set; }
        public bool can_review { get; set; }
        public bool can_delete { get; set; }
        public bool can_full_access { get; set; }
    }
}
