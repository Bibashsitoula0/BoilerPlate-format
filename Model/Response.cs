using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Response<T>
    {
        public string Message { get; set; }
        public string Status { get; set; }
        public T Data { get; set; }
    }

    public class Response
    {      
            public string Message { get; set; }
            public string Status { get; set; }
            public object Data { get; set; }
       

    }

}
