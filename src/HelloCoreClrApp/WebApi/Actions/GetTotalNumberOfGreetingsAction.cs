using System.Threading.Tasks;
using HelloCoreClrApp.Data;
using Serilog;

namespace HelloCoreClrApp.WebApi.Actions
{
    public class GetTotalNumberOfGreetingsAction : IGetTotalNumberOfGreetingsAction
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<GetTotalNumberOfGreetingsAction>();
        private readonly IDataService dataService;

        public GetTotalNumberOfGreetingsAction(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<int> Execute()
        {
            Log.Information("Looking for the total count of greetings.");
            var result = await dataService.GetNumberOfGreetings();

            Log.Information("We have {0} greetings totally.", result);
            return result;
        }
    }
}
