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
        private readonly IApplicationLifetime applicationLifetime;
        private readonly IDataService dataService;

        public SetupDatabaseTask(Container container, IApplicationLifetime applicationLifetime)
        {
            this.applicationLifetime = applicationLifetime;
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
                applicationLifetime.StopApplication();
            }
        }
    }
}