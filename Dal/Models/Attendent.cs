using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Attendent
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string LastName { get; set; } = null!;

    public string NumberPhone { get; set; } = null!;

    public int Kind { get; set; }

    public virtual ICollection<ClinicAppointment> ClinicAppointments { get; set; } = new List<ClinicAppointment>();
}
