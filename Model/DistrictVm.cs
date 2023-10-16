using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class DistrictVm
    {
        public int districtid { get; set; }
        public string districtname { get; set; }
        public string districtnamenepali { get; set; }
        public bool district_active { get; set; }
        public palikaVm Paliaka{ get; set; }

    }
}
