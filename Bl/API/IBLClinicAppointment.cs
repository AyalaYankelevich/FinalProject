using Bl.API;
using Bl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API
{
    public interface IBLClinicAppointment:IBLCrud<BLClinicAppointment>
    {
        //public void fUpdate(int attendentId, int clientId, Date_Hour date_Hour);
        public List<MyAppointment> FindByClientId(int id);
        public List<DoctorName> FindByKindAttendent(int kind);
    }
}
