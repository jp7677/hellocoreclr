using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NLog;

namespace HelloWorldApp
{
    [Controller]
    [Route("api")]
    public class HelloWorldController
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        IActionFactory actionFactory;
        
        public HelloWorldController(IActionFactory actionFactory)
        {
            this.actionFactory = actionFactory;
        }
        
        [Route("helloworld/{name}")]
        [HttpGet]
        public async Task<IActionResult> GetHelloWorldAsync(string name)
        {
            logger.Info("'HelloWorld' Request received with '{0}'.", name);
            
            var action = actionFactory.CreateGetHelloWorldAction();
            var response = await action.ExecuteAsync(name);

            return new OkObjectResult(response);
        }
    }
}
