using HelloWorldApp.WebApi.Actions;

namespace HelloWorldApp.WebApi
{
    public class ActionFactory : IActionFactory
    {
        private readonly IResourceProvider resourceProvider;
        
        public ActionFactory(IResourceProvider resourceProvider)
        {
            this.resourceProvider = resourceProvider;
        }
        
        public ISayHelloWorldAction CreateSayHelloWorldAction()
        {
            return resourceProvider.CreateResource<ISayHelloWorldAction>();            
        }

        public IGetLastTenGreetingsAction CreateGetLastTenHelloWorldsAction()
        {
            return resourceProvider.CreateResource<IGetLastTenGreetingsAction>();
        }
    }
}
