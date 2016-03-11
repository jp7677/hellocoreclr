using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;

namespace HelloWorldApp
{
    [Route("api")]
    public class HelloWorldController : Controller
    {
        ILogger logger;
        IActionFactory actionFactory;
        
        public HelloWorldController(ILoggerFactory loggerFactory, IActionFactory actionFactory)
        {
            logger = loggerFactory.CreateLogger(typeof(HelloWorldController).Name);
            this.actionFactory = actionFactory;
        }
        
        [Route("helloworld/{name}")]
        [HttpGet]
        public IActionResult GetHelloWorld(string name)
        {
            logger.LogInformation(string.Format("'HelloWorld' Request received with '{0}'.",name));
            
            var action = actionFactory.CreateGetHelloWorldAction();
            var response = action.Execute(name);
            return Ok(response);
        }
    }
}
