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
        IHelloWorldDataService dataService;
        
        public HelloWorldController(IActionFactory actionFactory, IHelloWorldDataService dataService)
        {
            this.actionFactory = actionFactory;
            this.dataService = dataService;
        }
        
        [Route("helloworld/{name}")]
        [HttpGet]
        public async Task<IActionResult> GetHelloWorldAsync(string name)
        {
            logger.Info("'HelloWorld' Request received with '{0}'.", name);
            
            var action = actionFactory.CreateGetHelloWorldAction();
            var response = action.Execute(name);

            await dataService.SaveGreetingAsync(response.Name);

            return new OkObjectResult(response);
        }
    }
}
