using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ProvinceDistrictPalika
    {
        public int provinceid { get; set; }
        public string provincename { get; set; }
        public string provincenamenepali { get; set; }
        public bool province_active { get; set; }
        public DistrictVm District { get; set; }
      
    }
}
