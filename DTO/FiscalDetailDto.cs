using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class FiscalDetailDto
    {
        public int fiscal_detail_id { get; set; }
        public int fiscal_id { get; set; }
        public string fydetail_name { get; set; }
        public string fydetail_nepali_name { get; set; }
        public DateTime from { get; set; }
        public DateTime to { get; set; }
        public string fy_type { get; set; }
        public bool locked { get; set; }
    }
}
