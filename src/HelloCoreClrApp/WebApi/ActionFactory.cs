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

        public ISayHelloWorldAction CreateSayHelloWorldAction() =>
            resourceProvider.CreateResource<ISayHelloWorldAction>();

        public IGetLastTenGreetingsAction CreateGetLastTenGreetingsAction() =>
            resourceProvider.CreateResource<IGetLastTenGreetingsAction>();

        public IGetTotalNumberOfGreetingsAction CreateGetTotalNumberOfGreetingsAction() =>
            resourceProvider.CreateResource<IGetTotalNumberOfGreetingsAction>();
    }
}
