using Dal.API;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Dal.Services
{
    public class ClinicAppointmentService : IClinicAppointment
    {
        DatabaseManager databaseManager;
        public ClinicAppointmentService(DatabaseManager db)
        {
            databaseManager = db;
        }

        public async void Create(ClinicAppointment item)
        {
            databaseManager.ClinicAppointments.Add(item);
            await databaseManager.SaveChangesAsync();
        }

        public async void Delete(int id)
        {
            var ClinicAppointmentToDelete = await databaseManager.ClinicAppointments.FirstOrDefaultAsync(ClinicAppointmentToDelete => ClinicAppointmentToDelete.Id == id);
            if (ClinicAppointmentToDelete != null)
            {
                databaseManager.ClinicAppointments.Remove(ClinicAppointmentToDelete);
                await databaseManager.SaveChangesAsync();
            }
            else
            {
                throw new Exception("not found this ClinicAppointment");
            }
        }

        public async void Delete(ClinicAppointment id)
        {
            throw new NotImplementedException();
        }

        public List<ClinicAppointment> Read()
        {
            return databaseManager.ClinicAppointments.ToList();
        }

        public async void Update(ClinicAppointment item)
        {
            var ClinicAppointmentToUpdate = await databaseManager.ClinicAppointments.FirstOrDefaultAsync(ClinicAppointmentToUpdate => ClinicAppointmentToUpdate.Id == item.Id);
            if (ClinicAppointmentToUpdate != null)
            {
                ClinicAppointmentToUpdate.Date = item.Date;
                ClinicAppointmentToUpdate.Hour = item.Hour;
                ClinicAppointmentToUpdate.AttendentId = item.AttendentId;
                ClinicAppointmentToUpdate.ClinetId = item.ClinetId;
                ClinicAppointmentToUpdate.IsReserved = item.IsReserved;
                await databaseManager.SaveChangesAsync();
            }
            else
            {
                throw new Exception("not found this ClinicAppointment");
            }
        }
    }
}