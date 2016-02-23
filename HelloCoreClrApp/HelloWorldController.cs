using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;

namespace HelloWorldApp
{
    [Route("api")]
    public class HelloWorldController : Controller
    {
        ILogger logger;
        
        public HelloWorldController(ILoggerFactory loggerFactory)
        {
            logger = loggerFactory.CreateLogger(typeof(HelloWorldController).Name);
        }
        
        [Route("helloworld/{name}")]
        [HttpGet]
        public IActionResult GetHelloWorld(string name)
        {
            logger.LogInformation(string.Format("'HelloWorld' Request received with '{0}'.",name));
            
            var action = new GetHelloWorldAction();
            var response = action.Execute(name);
            return Ok(response);
        }
    }
}
