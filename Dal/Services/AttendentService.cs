using Dal.API;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class AttendentService : IAttendent
    {

        DatabaseManager databaseManager;
        public AttendentService(DatabaseManager db)
        {
            databaseManager = db;
        }
        public void Create(Attendent item)
        {
            databaseManager.Attendents.Add(item);
            databaseManager.SaveChanges();
        }


        public void Delete(int id)
        {

            var attendentToDelete = databaseManager.Attendents.FirstOrDefault(attendentToDelete => attendentToDelete.Id == id);
            if (attendentToDelete != null)
            {
                databaseManager.Attendents.Remove(attendentToDelete);
                databaseManager.SaveChanges();
            }
            else
            {
                throw new Exception("not found this attendent");
            }
        }

        public void Delete(Attendent id)
        {
            throw new NotImplementedException();
        }

        public List<Attendent> Read()
        {
            return databaseManager.Attendents.ToList();
        }

        public void Update(Attendent item)
        {
            if (item == null)
                throw new Exception("you don't insert attendent");
            var attendentToUpdate = databaseManager.Attendents.FirstOrDefault(attendentToUpdate => attendentToUpdate.Id == item.Id);
            if (attendentToUpdate != null)
            {
                attendentToUpdate.Id = item.Id;
                attendentToUpdate.NumberPhone = item.NumberPhone;
                attendentToUpdate.LastName = item.LastName;
                attendentToUpdate.FirstName = item.FirstName;
                attendentToUpdate.Kind = item.Kind;
                databaseManager.SaveChanges();
            }
            else
            {
                throw new Exception("not found this attendent");
            }

        }

    }
}
