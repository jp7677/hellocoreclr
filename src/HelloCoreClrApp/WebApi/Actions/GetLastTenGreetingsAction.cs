using System.Linq;
using System.Threading.Tasks;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.WebApi.Messages;
using Serilog;

namespace HelloCoreClrApp.WebApi.Actions
{
    public class GetLastTenHelloWorldsAction : IGetLastTenGreetingsAction
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<GetLastTenHelloWorldsAction>();
        private readonly IDataService dataService;

        public GetLastTenHelloWorldsAction(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<SavedGreeting[]> Execute()
        {
            Log.Information("Looking for the last ten greetings.");
            const int numberOfResults = 10;
            var items = await dataService.GetLastTenGreetings(numberOfResults);

            Log.Information("We are returning {0} greetings.", items.Count);
            return items.Select(i => new SavedGreeting {Greeting = i.Name, TimestampUtc = i.TimestampUtc}).ToArray();
        }
    }
}
