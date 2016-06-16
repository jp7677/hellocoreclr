namespace HelloWorldApp
{
    public class HelloWorldDbContextFactory : IHelloWorldDbContextFactory
    {
        public IHelloWorldDbContext CreateHelloWorldDbContext()
        {
            return (IHelloWorldDbContext) new HelloWorldDbContext();
        }
    }
}