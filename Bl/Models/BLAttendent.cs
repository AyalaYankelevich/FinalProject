using System;
using System.Collections.Generic;

namespace Bl.Models;

public partial class BLAttendent
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string LastName { get; set; } = null!;

    public string NumberPhone { get; set; } = null!;

    public int Kind { get; set; }

    public virtual ICollection<BLClinicAppointment> ClinicAppointments { get; set; } = new List<BLClinicAppointment>();
}
