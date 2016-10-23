using System.Threading.Tasks;
using HelloWorldApp.Data;
using Serilog;

namespace HelloWorldApp.WebApi.Actions
{
    public class GetTotalNumberOfGreetingsAction : IGetTotalNumberOfGreetingsAction
    {
        private readonly ILogger log = Log.ForContext<SayHelloWorldAction>();
        private readonly IDataService dataService;

        public GetTotalNumberOfGreetingsAction(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<int> ExecuteAsync()
        {
            log.Information("Looking for the total count of greetings.");
            return  await dataService.GetNumberOfGreetingsAsync();
        }
    }
}
