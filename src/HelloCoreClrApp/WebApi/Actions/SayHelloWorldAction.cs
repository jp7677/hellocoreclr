using System;
using System.Threading.Tasks;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.WebApi.Messages;
using Serilog;

namespace HelloCoreClrApp.WebApi.Actions
{
    public class SayHelloWorldAction : ISayHelloWorldAction
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<SayHelloWorldAction>();
        private readonly IDataService dataService;

        public SayHelloWorldAction(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<SayHelloWorldResponse> Execute(string name)
        {
            Log.Information("Calculating result.");

            var(greeting, success) = Rules.SayHelloWorldRule.Process(name);
            if (success)
                await SaveGreeting(greeting);

            return new SayHelloWorldResponse { Greeting = greeting };
        }

        private async Task SaveGreeting(string greeting)
        {
            Log.Information("Save greeting.");
            await dataService.SaveGreeting(greeting);
        }
    }
}
