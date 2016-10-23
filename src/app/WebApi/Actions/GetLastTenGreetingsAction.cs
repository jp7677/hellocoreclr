using System.Linq;
using System.Threading.Tasks;
using HelloWorldApp.Data;
using HelloWorldApp.WebApi.Messages;
using Serilog;

namespace HelloWorldApp.WebApi.Actions
{
    public class GetLastTenHelloWorldsAction : IGetLastTenGreetingsAction
    {
        private readonly ILogger log = Log.ForContext<SayHelloWorldAction>();
        private readonly IDataService dataService;

        public GetLastTenHelloWorldsAction(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<SavedGreeting[]> ExecuteAsync()
        {
            log.Information("Looking for the last ten greetings.");
            const int numberOfResults = 10;
            var items = await dataService.GetLastTenGreetingsAsync(numberOfResults);

            return items.Select(i => new SavedGreeting {Greeting = i.Name, TimestampUtc = i.TimestampUtc}).ToArray();
        }
    }
}
