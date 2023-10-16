using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("province")]
    public class Province
    {
        public int id { get; set; }
        public string province_name { get; set; }
        public string province_name_nepali { get; set; }
        public bool is_active { get; set; }
    }
}
