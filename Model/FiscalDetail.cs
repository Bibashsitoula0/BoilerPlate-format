using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("fiscalyeardetail")]
    public class FiscalDetail
    {
        public int id { get; set; }
        public int fyid { get; set; }
        public string fydetail_name { get; set; }
        public string fydetail_nepali_name { get; set; }
        public DateTime from { get; set; }
        public DateTime to { get; set; }
        public string fy_type { get; set; }
        public bool locked { get; set; }

    }
}
