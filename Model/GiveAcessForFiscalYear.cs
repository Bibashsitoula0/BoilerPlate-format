using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class GiveAcessForFiscalYear
    {
        public int fiscalid { get; set; }
        public bool fy_locked { get; set; }
        public List<GiveAcessForFiscalYearDetail> fiscalYearDetail { get; set; }

    }
    public class GiveAcessForFiscalYearDetail
    {
        public int fy_detail_id { get; set; }
        public bool fy_detail_locked { get; set; }
    }

}
