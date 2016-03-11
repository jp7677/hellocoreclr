namespace HelloWorldApp
{
    public class ActionFactory : IActionFactory
    {
        private readonly IResourceProvider resourceProvider;
        
        public ActionFactory(IResourceProvider resourceProvider)
        {
            this.resourceProvider = resourceProvider;
        }
        
        public IGetHelloWorldAction CreateGetHelloWorldAction()
        {
            return resourceProvider.CreateResource<IGetHelloWorldAction>();            
        }
    }
}
