using Bl.API;
using Bl.Models;
using Dal.API;
using Dal.Models;
using Dal.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class BLAttendentService : IBLAttendent
    {

        private readonly IAttendent _attendent;
        //////////////////// Ayala 
        private readonly IClinicAppointment _appointment;
        private readonly IClient _client;

        public BLAttendentService(IDal dal)
        {
            _attendent = dal.Attendent;
            //////////////////// Ayala 
            _appointment = dal.ClinicAppointment;
            _client = dal.Client;
        }

        public void Create(BLAttendent item)
        {
            var IsExists = _attendent.Read().FirstOrDefault(IsExists => IsExists.Id == item.Id);
            if (IsExists == null)
            {
                _attendent.Create(new Attendent
                {
                    Id = item.Id,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    NumberPhone = item.NumberPhone,
                    Kind = item.Kind
                });
            }
        }

        public void Delete(int id)
        {
            {
                var AttendentToDelete = _attendent.Read().FirstOrDefault(AttendentToDelete
                    => AttendentToDelete.Id == id);
                if (AttendentToDelete != null)
                {
                    _attendent.Delete(AttendentToDelete);
                }
            }
        }

        public List<BLAttendent> Read()
        {
            var list = _attendent.Read();
            List<BLAttendent> result = new();
            foreach (var item in list)
            {
                result.Add(new BLAttendent
                {

                    Id = item.Id,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    NumberPhone = item.NumberPhone,
                    Kind = item.Kind
                });
            }
            return result;
        }

        public void Update(BLAttendent item)
        {
            var AttendentToUpdate = _attendent.Read().FirstOrDefault(AttendentToUpdate
                => AttendentToUpdate.Id == item.Id);
            if (AttendentToUpdate != null)
            {
                _attendent.Update(new Attendent
                {
                    Id = item.Id,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    NumberPhone = item.NumberPhone,
                    Kind = item.Kind
                }
               );
            }
        }

        public List<Date_Hour> FindByDoctor(string name)
        {
            List<Date_Hour> LS = new List<Date_Hour>();
            _attendent.Read().ForEach(
                p =>
                {
                    if (p.LastName == name)
                    {
                        LS.Add(new Date_Hour
                        {
                        });
                    }
                });

            return LS;
        }

        public BLAttendent ReadByID(int id)
        {

            var attendent = _attendent.ReadByID(id);
            BLAttendent attendent1;
            attendent1 = new BLAttendent
            {
                Id = attendent.Id,
                FirstName = attendent.FirstName,
                LastName = attendent.LastName,
                NumberPhone = attendent.NumberPhone,
                Kind = attendent.Kind,
            };
            return attendent1;

        }

        public List<DoctorName> FindByKindAttendent(int kind)
        {
            List<DoctorName> List = new List<DoctorName>();
            _attendent.Read().ForEach(
                p =>
                {
                    if (p.Kind == kind)
                    {
                        List.Add(new DoctorName
                        {
                            Id = p.Id,
                            FirstName = p.FirstName,
                            LastName = p.LastName,

                        });
                    }
                });

            return List;
        }
        //////////////////// Ayala 
        public List<SeeAppoitment> GetAppointmentsForDate(int attendentId, DateTime
    date)
        {
            var appointments = _attendent.GetAppointmentsForAttendentAndDate(attendentId, date);
            return appointments.Select(a => new SeeAppoitment
            {
                Date = a.Date,
                ClientId = a.ClinetId
            }).ToList();
        }

        //public List<BLClient> GetClients(int attendentId)
        //{
        //    var clients = _client.GetClientsForAttendent(attendentId);
        //    return clients.Select(c => new BLClient
        //    {
        //        Id = c.Id,
        //        FirstName = c.FirstName,
        //        LastName = c.LastName,
        //        Phone = c.Phone,
        //        // םיפסונ תודש ... 
        //    }).ToList();
        //}
    }

}

