using System.Threading.Tasks;
using HelloCoreClrApp.Data;
using Serilog;

namespace HelloCoreClrApp.WebApi.Actions
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
            var result = await dataService.GetNumberOfGreetingsAsync();

            log.Information("We have {0} greetings totally.", result);
            return result;
        }
    }
}
