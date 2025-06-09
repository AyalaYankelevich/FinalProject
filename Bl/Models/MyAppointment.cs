using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class MyAppointment: DoctorName
    {
        public DateOnly Date { get; set; }

        public TimeOnly Hour { get; set; }
    }
}
