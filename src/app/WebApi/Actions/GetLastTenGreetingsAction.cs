using System.Collections.Generic;
using System.Threading.Tasks;
using HelloWorldApp.Data;
using HelloWorldApp.WebApi.Messages;
using Serilog;

namespace HelloWorldApp.WebApi.Actions
{
    public class GetLastTenHelloWorldsAction : IGetLastTenGreetingsAction
    {
        private ILogger log = Log.ForContext<SayHelloWorldAction>();
        IDataService dataService;

        public GetLastTenHelloWorldsAction(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<GetLastTenGreetingsResponse> ExecuteAsync()
        {
            log.Information("Looking for the last ten greetings.");
            var numberOfResults = 10;
            var items = await dataService.GetLastTenGreetingsAsync(numberOfResults);

            var savedGreetingsList = new List<SavedGreeting>();
            foreach(var i in items)
                savedGreetingsList.Add(new SavedGreeting{Greeting = i.Name, TimestampUtc = i.TimestampUtc});

            var response = new GetLastTenGreetingsResponse{SavedGreetings = savedGreetingsList.ToArray()};
            return response;
        }
    }
}
