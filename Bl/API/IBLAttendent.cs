﻿using Bl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API
{
    public interface IBLAttendent:IBLCrud<BLAttendent>
    {
        public List<DoctorName> FindByKindAttendent(int kind);

    }
}
