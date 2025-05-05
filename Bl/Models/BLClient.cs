using System;
using System.Collections.Generic;

namespace Bl.Models;

public partial class BLClient
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateOnly DateOfBirth { get; set; }

    public string NumberPhone { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string? Email { get; set; }

    public virtual ICollection<BLClinicAppointment> ClinicAppointments { get; set; } = new List<BLClinicAppointment>();
}
