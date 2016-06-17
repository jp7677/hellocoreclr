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
            if (string.IsNullOrEmpty(name))
                return new GetHelloWorldResponse{Name = "Are you sure?"};

            string result = string.Format("Hello {0}!", name);
            
            logger.Info("Save greeting.");
            await dataService.SaveGreetingAsync(result);

            return new GetHelloWorldResponse{Name = result};
        }
    }
}
