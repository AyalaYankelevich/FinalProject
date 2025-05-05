using Bl.API;
using Bl.Services;
using Dal.API;
using Dal.Models;
using Microsoft.Extensions.DependencyInjection;
using Project;

namespace Bl
{
    public class BLManager:IBl
    {
        IDal Dal { get; set; }

        public IBLClient Clients { get; }

        public IBLAttendent Attendents { get; }

        public IBLClinicAppointment ClinicAppointments{ get; }

        public BLManager()
        {
            ServiceCollection services = new ServiceCollection();
            services.AddSingleton<IDal, DalManager>();
            services.AddSingleton<IBLClient, BLClientService>();
            services.AddSingleton<IBLClinicAppointment, BLClinicAppointmentService>();
            services.AddSingleton<IBLAttendent, BLAttendentService>();
            ServiceProvider serviceProvider = services.BuildServiceProvider();
            Dal = serviceProvider.GetRequiredService<IDal>();

            Clients = serviceProvider.GetRequiredService<IBLClient>();
            Attendents = serviceProvider.GetRequiredService<IBLAttendent>();
            ClinicAppointments = serviceProvider.GetRequiredService<IBLClinicAppointment>();
        }
        
 
       
    }
}
