using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("palika")]
    public class Palika
    {
        public int id { get; set; }
        public int district_id { get; set; }
        public string palika_name { get; set; }
        public string palika_name_nepali { get; set; }
        public bool is_active { get; set; }


    }
}
