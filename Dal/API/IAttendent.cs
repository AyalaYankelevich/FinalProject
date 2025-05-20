using Dal.API;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.API
{
    public interface IAttendent : ICrud<Attendent>
    {
        public Attendent ReadByID(int id);
    }
}
