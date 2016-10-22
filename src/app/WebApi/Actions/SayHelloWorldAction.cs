using System.Threading.Tasks;
using HelloWorldApp.Data;
using HelloWorldApp.WebApi.Messages;
using Serilog;

namespace HelloWorldApp.WebApi.Actions
{
    public class SayHelloWorldAction : ISayHelloWorldAction
    {
        private readonly ILogger log = Log.ForContext<SayHelloWorldAction>();
        private readonly IDataService dataService;

        public SayHelloWorldAction(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<SayHelloWorldResponse> ExecuteAsync(string name)
        {
            log.Information("Calculating result.");

            // VS Code doesn't know yet about referenced F# project, that why intellisense complains :(, though it builds just fine. 
            var res = GetHelloWorldRule.Process(name);
            
            if (res.Item2)
                await SaveGreetingAsync(res.Item1);

            return new SayHelloWorldResponse{Greeting = res.Item1};
        }

        private async Task SaveGreetingAsync(string greeting)
        {
            log.Information("Save greeting.");
            await dataService.SaveGreetingAsync(greeting);
        }
    }
}
