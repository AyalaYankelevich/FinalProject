using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API
{
    public interface IBLCrud<T>
    {
        void Delete(int id);
        List<T> Read();
        void Create(T item);
        void Update(T item);
    }
}
