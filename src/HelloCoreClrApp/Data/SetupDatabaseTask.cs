using System.Threading.Tasks;
using Serilog;

namespace HelloCoreClrApp.Data
{
    public class SetupDatabaseTask
    {
        private readonly IDataService dataService;
        private static readonly ILogger Log = Serilog.Log.ForContext<SetupDatabaseTask>();

        public SetupDatabaseTask(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task RunAsync()
        {
            Log.Information("Setup database.");
            await dataService.EnsureCreatedAsync();

            Log.Information("Currently we have {0} saved Greetings.", await dataService.GetNumberOfGreetingsAsync());
        }
    }
}