using Dal.API;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services 
{ 
    public class ClientService : IClient
    { 
        DatabaseManager db;
        public ClientService(DatabaseManager databaseManager)
        {
             db = databaseManager;
        }
        public void Create(Client item)
        {
            db.Clients.Add(item);
            db.SaveChanges();
        }

        public void Delete(Client item)
        {
            db.Clients.Remove(item);
            db.SaveChanges();
        }

        public List<Client> Read()
        {
            return db.Clients.ToList();
        }

        public void Update(Client item)
        {
            var clientToUpdate = db.Clients.FirstOrDefault(clientToUpdate => clientToUpdate.Id == item.Id);

              clientToUpdate.Id = item.Id;
              clientToUpdate.NumberPhone = item.NumberPhone;
              clientToUpdate.LastName = item.LastName;
              clientToUpdate.FirstName = item.FirstName;
              clientToUpdate.DateOfBirth = item.DateOfBirth;
              clientToUpdate.Email = item.Email;
              clientToUpdate.Address = item.Address;
              db.SaveChanges();


        }

    }
}
