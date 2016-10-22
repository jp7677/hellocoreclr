using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace HelloWorldApp.WebApi
{
    [Controller]
    [Route("api")]
    public class HelloWorldController
    {
        private readonly ILogger log = Log.ForContext<HelloWorldController>();
        private readonly IActionFactory actionFactory;
        
        public HelloWorldController(IActionFactory actionFactory)
        {
            this.actionFactory = actionFactory;
        }
        
        [Route("helloworld/{name}")]
        [HttpGet]
        public async Task<IActionResult> SayHelloWorldAsync(string name)
        {
            log.Information("'helloworld' Request received with '{0}'.", name);
            
            var action = actionFactory.CreateSayHelloWorldAction();
            var response = await action.ExecuteAsync(name);

            return new OkObjectResult(response);
        }

        [Route("helloworld")]
        [HttpGet]
        public async Task<IActionResult> GetLastTenGreetingsAsync()
        {
            log.Information("'helloworld' Request received.");
            
            var action = actionFactory.CreateGetLastTenGreetingsAction();
            var response = await action.ExecuteAsync();

            return new OkObjectResult(response);
        }
    }
}
