namespace HelloWorldApp
{
    public class HelloWorldDbContextFactory : IHelloWorldDbContextFactory
    {
        private readonly IResourceProvider resourceProvider;
        
        public HelloWorldDbContextFactory(IResourceProvider resourceProvider)
        {
            this.resourceProvider = resourceProvider;
        }

        public IHelloWorldDbContext CreateHelloWorldDbContext()
        {
            return resourceProvider.CreateResource<IHelloWorldDbContext>();
        }
    }
}