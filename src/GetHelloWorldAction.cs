using System.Threading.Tasks;
using NLog;

namespace HelloWorldApp
{
    public class GetHelloWorldAction : IGetHelloWorldAction
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        IHelloWorldDataService dataService;

        public GetHelloWorldAction(IHelloWorldDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<GetHelloWorldResponse> ExecuteAsync(string name)
        {
            logger.Info("Calculating result.");
            string result = !string.IsNullOrEmpty(name) 
                            ? string.Format("Hello {0}!", name)
                            : "Are you sure?";
            
            logger.Info("Save greeting.");
            await dataService.SaveGreetingAsync(result);

            logger.Info("Return result.");
            return new GetHelloWorldResponse{Name = result};
        }
    }
}
