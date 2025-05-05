using Dal.API;
using Dal.Models;
using Dal.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Project
{
    public class DalManager : IDal
    {
        public IClient Client { get; } = null!;
        public IAttendent Attendent { get; } = null!;
        public IClinicAppointment ClinicAppointment { get; }= null!;

     

        public DalManager()
        {

            ServiceCollection services = new ServiceCollection();

            services.AddSingleton<DatabaseManager>();
            services.AddSingleton<IClient, ClientService>();
            services.AddSingleton<IAttendent, AttendentService>();
            services.AddSingleton<IClinicAppointment, ClinicAppointmentService>();

            ServiceProvider serviceProvider = services.BuildServiceProvider();

            Client = serviceProvider.GetRequiredService<IClient>();
            Attendent = serviceProvider.GetRequiredService<IAttendent>();
            ClinicAppointment = serviceProvider.GetRequiredService<IClinicAppointment>();

        }

    }
}
