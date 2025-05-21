using System;
using System.Collections.Generic;

namespace Bl.Models;

public partial class BLClinicAppointment
{
    public int Id { get; set; }

    public DateOnly Date { get; set; }

    public TimeOnly Hour { get; set; }

    public int AttendentId { get; set; }

    public int? ClinetId { get; set; }

    public int IsReserved { get; set; }

    public virtual BLAttendent Attendent { get; set; } = null!;

    public virtual BLClient Clinet { get; set; } = null!;
}
