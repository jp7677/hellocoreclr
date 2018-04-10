using System.Threading.Tasks;
using Serilog;

namespace HelloCoreClrApp.Data
{
    public class SetupDatabaseTask
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<SetupDatabaseTask>();
        private readonly IDataService dataService;

        public SetupDatabaseTask(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task Run()
        {
            Log.Information("Setup database.");
            await dataService.EnsureCreated();

            Log.Information("Currently we have {0} saved Greetings.", await dataService.GetNumberOfGreetings());
        }
    }
}