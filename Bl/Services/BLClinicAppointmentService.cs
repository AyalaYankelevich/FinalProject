// Bl.Services.BLClinicAppointmentService.cs
using Bl.API;
using Bl.Models;
using Dal.API;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
            var existingAppointment = _clinicAppointment.Read().FirstOrDefault(a => a.Id == item.Id);
            if (existingAppointment == null)
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
            else
            {
                Console.WriteLine($"BLClinicAppointmentService.Create: Appointment with ID {item.Id} already exists, not creating a duplicate.");
            }
        }

        public void Delete(int id)
        {
            //var clinicAppointmentToDelete = _clinicAppointment.Read().FirstOrDefault(ca => ca.Id == id);
            //if (clinicAppointmentToDelete != null)
            //{
            //    _clinicAppointment.Delete(clinicAppointmentToDelete.Id);
            //}
            //else
            //{
            //    throw new Exception($"Appointment with ID {id} not found for deletion.");
            //}
        }

        public List<BLClinicAppointment> Read()
        {
            var list = _clinicAppointment.Read();
            List<BLClinicAppointment> result = new();
            foreach (var item in list)
            {
                result.Add(new BLClinicAppointment
                {
                    Id = item.Id,
                    Date = item.Date,
                    Hour = item.Hour,
                    AttendentId = item.AttendentId,
                    ClinetId = item.ClinetId,
                    IsReserved = item.IsReserved,
                });
            }
            return result;
        }

        public void Update(BLClinicAppointment item)
        {
            var clinicAppointmentToUpdate = _clinicAppointment.Read().FirstOrDefault(ca => ca.Id == item.Id);
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
            else
            {
                throw new Exception($"Appointment with ID {item.Id} not found for update.");
            }
        }

        // // 👈 זו הפונקציה שאתה צריך להוסיף/לשנות!
        // public void BookAppointmentForClient(int appointmentId, int clientId)
        // {
        //     var appointmentToBook = _clinicAppointment.Read()
        //                                               .FirstOrDefault(a => a.Id == appointmentId);

        //     if (appointmentToBook == null)
        //     {
        //         throw new Exception($"Appointment with ID {appointmentId} not found.");
        //     }

        //     if (appointmentToBook.IsReserved == 1) // 1 מציין שתור שמור
        //     {
        //         throw new Exception($"Appointment with ID {appointmentId} is already reserved.");
        //     }

        //     // עדכון פרטי התור
        //     appointmentToBook.ClinetId = clientId;
        //     appointmentToBook.IsReserved = 1; // 1 מציין שהתור שמור

        //     _clinicAppointment.Update(appointmentToBook); // קורא לשיטת העדכון בשכבת ה-DAL
        //     Console.WriteLine($"Appointment {appointmentId} booked for client {clientId}.");
        // }
        public void BookAppointmentForClient(int appointmentId, int clientId)
        {
            // שימוש ב-Transaction מבטיח שאם משהו נכשל באמצע, הכל חוזר לקדמותו (Atomic)
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // 1. שליפה עם נעילה (Lock) - מונע ממשתמש אחר לקרוא את השורה הזו עד שנסיים
                    var appointmentToBook = _context.Appointments
                        .FirstOrDefault(a => a.Id == appointmentId);
        
                    // 2. בדיקה: האם התור קיים?
                    if (appointmentToBook == null)
                    {
                        throw new KeyNotFoundException($"Appointment {appointmentId} not found.");
                    }
        
                    // 3. בדיקה: האם התור כבר נתפס? (מקרה קצה קריטי)
                    if (appointmentToBook.IsReserved == 1)
                    {
                        throw new InvalidOperationException($"Appointment {appointmentId} is already reserved by another client.");
                    }
        
                    // 4. עדכון הנתונים
                    appointmentToBook.ClientId = clientId;
                    appointmentToBook.IsReserved = 1;
                    appointmentToBook.UpdatedAt = DateTime.UtcNow; // תיעוד זמן השינוי
        
                    // 5. שמירה סופית בבסיס הנתונים
                    _context.SaveChanges();
        
                    // אישור סופי של ה-Transaction
                    transaction.Commit();
        
                    Console.WriteLine($"Success: Appointment {appointmentId} booked for client {clientId}.");
                }
                catch (InvalidOperationException ex)
                {
                    // טיפול במצב שהתור כבר תפוס (לוגיקה עסקית)
                    transaction.Rollback();
                    Console.WriteLine($"Booking Failed: {ex.Message}");
                    throw; // זריקה מחדש כדי שה-API יחזיר שגיאה מתאימה (למשל 409 Conflict)
                }
                catch (Exception ex)
                {
                    // טיפול בשגיאות טכניות (בעיות ב-DB, תקשורת וכו')
                    transaction.Rollback();
                    Console.WriteLine($"System Error: {ex.Message}");
                    throw new Exception("An internal error occurred during booking.");
                }
            }
        }

        public List<Date_Hour> FindByDoctor(string name)
        {
            List<Date_Hour> LS = new List<Date_Hour>();
            _clinicAppointment.Read().ForEach(
                p =>
                {
                    if (p.Attendent != null && p.Attendent.LastName == name)
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
                    if (p.Attendent != null && p.Attendent.Id == id)
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

        public List<MyAppointment> MyAppointment(int id)
        {
            List<MyAppointment> LS = new List<MyAppointment>();
            _clinicAppointment.Read().ForEach(
               p =>
               {
                   if (p.Clinet != null && p.Clinet.Id == id)
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
                    if (p.ClinetId == id)
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

        public List<Date_Hour> FindByAttedentId(int id)
        {
            List<Date_Hour> LS = new List<Date_Hour>();
            _clinicAppointment.Read().ForEach(
                p =>
                {
                    if (p.AttendentId == id)
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
            var appointments = _clinicAppointment.Read();
            var kindMatches = appointments.Where(p => p.Attendent != null && p.Attendent.Kind == kind).ToList();
            var reservedMatches = kindMatches.Where(p => p.IsReserved == 0).ToList();
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
