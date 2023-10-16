using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public sealed class SelectList
    {
        public int Key { get; set; } = 0;
        public string Value { get; set; } = string.Empty;
        public decimal Points { get; set; } 
        public bool IsChecked { get; set; } 
    }
    public sealed class SelectListModel
    {
        public string Key { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public decimal Points { get; set; }
        public bool IsChecked { get; set; }
    }

}
