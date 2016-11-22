using HelloCoreClrApp.WebApi.Actions;

namespace HelloCoreClrApp.WebApi
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

        public IGetLastTenGreetingsAction CreateGetLastTenGreetingsAction()
        {
            return resourceProvider.CreateResource<IGetLastTenGreetingsAction>();
        }

        public IGetTotalNumberOfGreetingsAction CreateGetTotalNumberOfGreetingsAction()
        {
            return resourceProvider.CreateResource<IGetTotalNumberOfGreetingsAction>();
        }
    }
}
