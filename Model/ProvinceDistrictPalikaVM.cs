using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ProvinceDistrictPalikaVM
    {
        public int provinceid { get; set; }
        public string provincename { get; set; }
        public string provincenamenepali { get; set; }
        public bool province_active { get; set; }
        public int districtid { get; set; }
        public string districtname { get; set; }
        public string districtnamenepali { get; set; }
        public bool district_active { get; set; }
        public int palikaid { get; set; }
        public string palikaname { get; set; }
        public string palikanamenepali { get; set; }
        public bool palikaactive { get; set; }
    }
}
