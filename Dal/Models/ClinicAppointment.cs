using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class ClinicAppointment
{
    public int Id { get; set; }

    public DateOnly Date { get; set; }

    public TimeOnly Hour { get; set; }

    public int AttendentId { get; set; }

    public int? ClinetId { get; set; }

    public int IsReserved { get; set; }

    public virtual Attendent Attendent { get; set; } = null!;

    public virtual Client Clinet { get; set; } = null!;
}
