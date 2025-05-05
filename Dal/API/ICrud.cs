using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.API
{
    public interface ICrud<T>
    {
        void Delete(T id);
        List<T> Read();
        void Create(T item);
        void Update(T item);
    }
}
