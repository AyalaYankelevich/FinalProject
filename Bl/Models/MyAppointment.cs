using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class MyAppointment:Date_Hour
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int Kind { get; set; }
    }
}
