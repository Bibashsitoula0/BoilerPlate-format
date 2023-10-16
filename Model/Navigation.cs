using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Navigation
    {
        public int navigation_id { get; set; }
        public string title { get; set; }
        public string link { get; set; }
        public string type { get; set; }
        public int parent_navigation_id { get; set; }
        public int root_navigation_id { get; set; }
        public string icon { get; set; }
        public int display_order { get; set; }
        public bool showin_ui { get; set; }
        public bool can_create { get; set; }
        public bool can_review { get; set; }
        public bool can_approve { get; set; }
        public bool can_allow { get; set; }
        public bool can_delete { get; set; }
        public bool can_full_access { get; set; }
        public List<Navigation> children { get; set; }
    }
}
