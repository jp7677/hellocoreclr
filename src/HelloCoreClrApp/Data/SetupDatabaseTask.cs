using System.Threading.Tasks;
using HelloCoreClrApp.SystemMonitor;
using Serilog;
using SimpleInjector;

namespace HelloCoreClrApp.Data
{
    public class SetupDatabaseTask
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<SystemMonitorTask>();

        public static async Task RunAsync(Container container)
        {
            Log.Information("Setup database.");
            var dataService = container.GetInstance<IDataService>();

            await dataService.EnsureCreatedAsync();
            Log.Information("Currently we have {0} saved Greetings.", await dataService.GetNumberOfGreetingsAsync());
        }
    }
}