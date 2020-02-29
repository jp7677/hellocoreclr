using System.Threading.Tasks;
using HelloCoreClrApp.WebApi.Actions;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace HelloCoreClrApp.WebApi
{
    [Controller]
    [Route("api")]
    public class HelloWorldController
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<HelloWorldController>();
        private readonly IResourceProvider resourceProvider;

        public HelloWorldController(IResourceProvider resourceProvider)
        {
            this.resourceProvider = resourceProvider;
        }

        [Route("sayhelloworld")]
        [HttpPost]
        public async Task<IActionResult> SayHelloWorld([FromBody] string name)
        {
            Log.Information("'sayhelloworld' Request received with '{0}'.", name);

            var action = resourceProvider.CreateResource<ISayHelloWorldAction>();
            var response = await action.Execute(name);

            return new OkObjectResult(response);
        }

        [Route("greetings")]
        [HttpGet]
        public async Task<IActionResult> GetLastTenGreetings()
        {
            Log.Information("'greetings' Request received.");

            var action = resourceProvider.CreateResource<IGetLastTenGreetingsAction>();
            var response = await action.Execute();

            if (response.GetLength(0) == 0)
                return new NoContentResult();

            return new OkObjectResult(response);
        }

        [Route("greetings/count")]
        [HttpGet]
        public async Task<IActionResult> GetTotalNumberOfGreetings()
        {
            Log.Information("'greetings/count' Request received.");

            var action = resourceProvider.CreateResource<IGetTotalNumberOfGreetingsAction>();
            var response = await action.Execute();

            return new OkObjectResult(response);
        }
    }
}
