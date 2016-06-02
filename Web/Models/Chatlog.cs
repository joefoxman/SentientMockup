using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POC.Models
{
    public class Chatlog
    {
        public User User { get; set; }
        public string Message { get; set; }
        public DateTime MessageDateTime { get; set; }
    }
}
