using Bl.API;
using Bl.Models;
using Dal.API;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class BLClinicAppointmentService : IBLClinicAppointment
    {
        private readonly IClinicAppointment _clinicAppointment;
        public BLClinicAppointmentService(IDal dal)
        {
            _clinicAppointment = dal.ClinicAppointment;
        }

        public void Create(BLClinicAppointment item)
        {
            var IsExists = _clinicAppointment.Read().FirstOrDefault(IsExists => IsExists.Id == item.Id);
            if (IsExists != null)
            {
                _clinicAppointment.Create(new ClinicAppointment
                { 
                    
                        Id = item.Id,
                        Date = item.Date,
                        Hour = item.Hour,
                      ClinetId = item.ClinetId,
                    AttendentId = item.AttendentId,
                    IsReserved = item.IsReserved
                    });
                   
            }
        }

        public void Delete(int id)
        {
            var clinicAppointmentDelete = _clinicAppointment.Read().FirstOrDefault(clinicAppointmentDelete
               => clinicAppointmentDelete.Id == id);
            if (clinicAppointmentDelete != null)
            {
                _clinicAppointment.Delete(clinicAppointmentDelete);
            }
        }


        public List<BLClinicAppointment> Read()
        {
            var list = _clinicAppointment.Read();
            List<BLClinicAppointment> result = new();
            foreach (var item in list)
            {
                result.Add(new BLClinicAppointment
                {
                  Id=item.Id,
                    Date = item.Date,
                    Hour =item.Hour,
                    AttendentId =item.AttendentId,
                    ClinetId =item.ClinetId,
                    IsReserved =item.IsReserved,
                });
            }
            return result;
        }

        public void Update(BLClinicAppointment item)
        {
            var clinicAppointmentToUpdate = _clinicAppointment.Read().FirstOrDefault(clinicAppointmentToUpdate
             => clinicAppointmentToUpdate.Id == item.Id);
            if (clinicAppointmentToUpdate != null)
            {
                _clinicAppointment.Update(new ClinicAppointment
                {
                    Id = item.Id,
                    Date = item.Date,
                    Hour = item.Hour,
                    AttendentId = item.AttendentId,
                    ClinetId = item.ClinetId,
                    IsReserved = item.IsReserved,
                });
            }
        }
        //to change an appoitment??
        //public void fUpdate(int attendentId, int clientId, Date_Hour date_Hour)
        //{

        //    var clinicAppointmentToUpdate = _clinicAppointment.Read().FirstOrDefault(p => p.AttendentId == attendentId && p.IsReserved == 0 && p.Date == date_Hour.Date && p.Hour == date_Hour.Hour);
        //    if (clinicAppointmentToUpdate != null)
        //    {
        //        _clinicAppointment.Update(new ClinicAppointment
        //        {
                   
        //            Date =date_Hour.Date,
        //            Hour = date_Hour.Hour,
        //            AttendentId = attendentId,
        //            ClinetId = clientId,
        //            IsReserved = 1,
        //        });
        //    }
        //}
            public List<Date_Hour> FindByDoctor(string name)
        {
            List<Date_Hour> LS = new List<Date_Hour>();
            _clinicAppointment.Read().ForEach(
                p =>
                {
                    if (p.Attendent.LastName == name)
                    {
                        LS.Add(new Date_Hour
                        {
                            Date = p.Date,
                            Hour = p.Hour
                        });
                    }
                });

            return LS;
        }

        public List<Date_Hour> FindById(int id)
        {
            List<Date_Hour> LS = new List<Date_Hour>();
            _clinicAppointment.Read().ForEach(
                p =>
                {
                    if (p.Attendent.Id == id)
                    {
                        LS.Add(new Date_Hour
                        {
                            Date = p.Date,
                            Hour = p.Hour
                        });
                    }
                });

            return LS;
        }
        public List<MyAppointment> MyAppointment(int id) {
            List<MyAppointment> LS = new List<MyAppointment>();
            _clinicAppointment.Read().ForEach(
             p =>
             {
                 if (p.Clinet.Id == id)
                 {
                     LS.Add(new MyAppointment
                     {
                         Date = p.Date,
                         Hour = p.Hour,
              
                     });
                 }
             });
            return LS;
        }

         public List<Date_Hour> FindByClientId(int id)
        {
            List<Date_Hour> LS = new List<Date_Hour>();
            _clinicAppointment.Read().ForEach(
                p =>
                {
                    if (p.ClinetId== id)
                    {
                        LS.Add(new Date_Hour
                        {
                            Date = p.Date,
                            Hour = p.Hour
                        });
                    }
                });

            return LS;
        }


        public List<DoctorName> FindByKindAttendent(int kind)
        {
            var now = DateTime.Now;

            var appointments = _clinicAppointment.Read();
            Console.WriteLine("All appointments: " + appointments.Count);
            var kindMatches = appointments.Where(p => p.Attendent.Kind == kind).ToList();
            Console.WriteLine("Kind matches: " + kindMatches.Count);
            var reservedMatches = kindMatches.Where(p => p.IsReserved == 0).ToList();
            Console.WriteLine("IsReserved == 0 matches: " + reservedMatches.Count);
            var result = reservedMatches
                .GroupBy(p => p.Attendent.Id)
                .Select(g =>
                {
                    var nextAppointment = g.OrderBy(a => a.Date.ToDateTime(a.Hour)).FirstOrDefault();
                    return nextAppointment == null ? null : new DoctorName
                    {
                        FirstName = nextAppointment.Attendent.FirstName,
                        LastName = nextAppointment.Attendent.LastName,
                        Date = nextAppointment.Date,
                        Hour = nextAppointment.Hour
                    };
                })
                .Where(d => d != null)
                .ToList();

            return result;
        }
    }
     

}

