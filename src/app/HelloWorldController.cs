using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace HelloWorldApp
{
    [Controller]
    [Route("api")]
    public class HelloWorldController
    {
        private ILogger log = Log.ForContext<HelloWorldController>();
        IActionFactory actionFactory;
        
        public HelloWorldController(IActionFactory actionFactory)
        {
            this.actionFactory = actionFactory;
        }
        
        [Route("helloworld/{name}")]
        [HttpGet]
        public async Task<IActionResult> GetHelloWorldAsync(string name)
        {
            log.Information("'HelloWorld' Request received with '{0}'.", name);
            
            var action = actionFactory.CreateGetHelloWorldAction();
            var response = await action.ExecuteAsync(name);

            return new OkObjectResult(response);
        }
    }
}
