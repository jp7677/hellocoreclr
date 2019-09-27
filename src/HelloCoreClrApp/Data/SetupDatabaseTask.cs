using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Serilog;
using SimpleInjector;

namespace HelloCoreClrApp.Data
{
    public class SetupDatabaseTask : BackgroundService
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<SetupDatabaseTask>();
        private readonly IHostApplicationLifetime hostApplicationLifetime;
        private readonly IDataService dataService;

        public SetupDatabaseTask(Container container, IHostApplicationLifetime hostApplicationLifetime)
        {
            this.hostApplicationLifetime = hostApplicationLifetime;
            dataService = container.GetInstance<IDataService>();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            Log.Information("Setup database");
            try
            {
                await dataService.EnsureCreated(stoppingToken);
                Log.Information("Currently we have {0} saved Greetings", await dataService.GetNumberOfGreetings());
            }
            catch (Exception exception)
            {
                Log.Fatal(exception, "Setup database failed with {exception}", exception.Message);
                hostApplicationLifetime.StopApplication();
            }
        }
    }
}