using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("district")]
    public class District
    {
        public int id { get; set; }
        public int province_id { get; set; }
        public string district_name { get; set; }
        public string district_name_nepali { get; set; }
        public bool is_active { get; set; }
      
    }
}
