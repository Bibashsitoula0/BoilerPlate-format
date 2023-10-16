using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("fiscalyear")]
    public class FiscalYears
    {
        public int id { get; set; }
        public string fyname { get; set; }
        public string fynamenepali { get; set; }
        public DateTime from { get; set; }
        public DateTime to { get; set; }
        public bool locked { get; set; }
    }
}
