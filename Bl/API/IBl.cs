using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API
{

    public interface IBl
    {
        public IBLClient Clients { get; }
        public IBLAttendent Attendents { get; }
        public IBLClinicAppointment ClinicAppointments { get; }

    }
}
