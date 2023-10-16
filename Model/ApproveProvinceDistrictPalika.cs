using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ApproveProvinceDistrictPalika
    {
        public int provinceid { get; set; }
        public bool province_is_active { get; set; }
        public int districtid { get; set; }
        public bool district_is_active { get; set; }
        public int palikaid { get; set; }
        public bool palika_is_active { get; set; }
    }
}
