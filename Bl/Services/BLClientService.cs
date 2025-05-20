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
    public class BLClientService : IBLClient

    {
        private readonly IClient  _client;
        public BLClientService(IDal dal)
        {
            _client = dal.Client;

        }
        public void Create(BLClient item)
        {
            var IsExists = _client.Read().FirstOrDefault(IsExists => IsExists.Id == item.Id);
            if (IsExists == null)
                _client.Create(new Client 
                { 
                  Id = item.Id,
                  Address = item.Address ,
                  FirstName=item.FirstName,
                  LastName=item.LastName,
                  Email=item.Email, 
                  NumberPhone=item.NumberPhone,
                  DateOfBirth=item.DateOfBirth 
                });
        }

        public void Delete(int id)
        {
            var clientToDelete = _client.Read().FirstOrDefault(clientToDelete
                => clientToDelete.Id == id);
            if (clientToDelete != null)
            {
                _client.Delete(clientToDelete);
            }
        }


        public List<BLClient> Read()
        {
            var list = _client.Read();
            List<BLClient> result = new();
            foreach (var item in list)
            {
                result.Add(new BLClient
                {

                    Id = item.Id,
                    Address = item.Address,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    Email = item.Email,
                    NumberPhone = item.NumberPhone,
                    DateOfBirth = item.DateOfBirth
                });
            }
            return result;
        }

        public BLClient ReadByID(int id)

        {
            var client = _client.ReadByID(id);
            if (client == null)
            {
                return null;
            }
            BLClient client1;
            client1 = new BLClient
            {
                Id = client.Id,
                Address = client.Address,
                FirstName = client.FirstName,
                LastName = client.LastName,
                Email = client.Email,
                NumberPhone = client.NumberPhone,
                DateOfBirth = client.DateOfBirth
            };
            
            return  client1;
        }
        public void Update(BLClient item)
        {
            var clientToUpdate = _client.Read().FirstOrDefault(clientToUpdate
                => clientToUpdate.Id == item.Id);
            if (clientToUpdate != null)
            {
                _client.Update(new Client
                {
                    Id = item.Id,
                    Address = item.Address,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    Email = item.Email,
                    NumberPhone = item.NumberPhone,
                    DateOfBirth = item.DateOfBirth
                });
            }
        }
    }
}
