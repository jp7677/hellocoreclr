using System.Threading.Tasks;
using Serilog;

namespace HelloWorldApp
{
    public class GetHelloWorldAction : IGetHelloWorldAction
    {
        private ILogger log = Log.ForContext<GetHelloWorldAction>();
        IHelloWorldDataService dataService;

        public GetHelloWorldAction(IHelloWorldDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<GetHelloWorldResponse> ExecuteAsync(string name)
        {
            log.Information("Calculating result.");

            // VS Code doesn't know yet about referenced F# project, that why intellisense complains :(, though it builds just fine. 
            var res = GetHelloWorldRule.Process(name);
            
            if (res.Item2)
                await SaveGreetingAsync(res.Item1);

            return new GetHelloWorldResponse{Name = res.Item1};
        }

        private async Task SaveGreetingAsync(string response)
        {
            log.Information("Save greeting.");
            await dataService.SaveGreetingAsync(response);
        }
    }
}
