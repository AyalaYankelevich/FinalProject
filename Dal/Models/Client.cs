using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Client
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateOnly DateOfBirth { get; set; }

    public string NumberPhone { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string? Email { get; set; }

    public virtual ICollection<ClinicAppointment> ClinicAppointments { get; set; } = new List<ClinicAppointment>();
}
