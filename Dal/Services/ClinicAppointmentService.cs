using Dal.API;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class ClinicAppointmentService : IClinicAppointment
    {
        DatabaseManager databaseManager;
        public ClinicAppointmentService(DatabaseManager db)
        {
            databaseManager = db;
        }
        public void Create(ClinicAppointment item)
        {
            var IsExists = databaseManager.ClinicAppointments.FirstOrDefault(IsExists => IsExists.Id == item.Id);
            if (IsExists == null)
            {
                databaseManager.ClinicAppointments.Add(item);
                databaseManager.SaveChanges();
            }

        }



        public void Delete(int id)
        {
            var ClinicAppointmentToDelete = databaseManager.ClinicAppointments.FirstOrDefault(ClinicAppointmentToDelete => ClinicAppointmentToDelete.Id == id);
            if (ClinicAppointmentToDelete != null)
            {
                databaseManager.ClinicAppointments.Remove(ClinicAppointmentToDelete);
                databaseManager.SaveChanges();
            }
            else
            {
                throw new Exception("not found this ClinicAppointment");
            }
        }

        public void Delete(ClinicAppointment id)
        {
            throw new NotImplementedException();
        }

        public List<ClinicAppointment> Read()
        {
            return databaseManager.ClinicAppointments.ToList();
        }

        public void Update(ClinicAppointment item)
        {
            var ClinicAppointmentToUpdate = databaseManager.ClinicAppointments.FirstOrDefault(ClinicAppointmentToUpdate => ClinicAppointmentToUpdate.Id == item.Id);
            if (ClinicAppointmentToUpdate != null)
            {
                ClinicAppointmentToUpdate.Id = item.Id;
                ClinicAppointmentToUpdate.Date = item.Date;
                ClinicAppointmentToUpdate.Hour = item.Hour;
                ClinicAppointmentToUpdate.AttendentId = item.AttendentId;
                ClinicAppointmentToUpdate.ClinetId = item.ClinetId;
                ClinicAppointmentToUpdate.IsReserved = item.IsReserved;
                databaseManager.SaveChanges();
            }
            else
            {
                throw new Exception("not found this ClinicAppointment");
            }

        }


        List<ClinicAppointment> ICrud<ClinicAppointment>.Read()
        {
            throw new NotImplementedException();
        }
    }
}
