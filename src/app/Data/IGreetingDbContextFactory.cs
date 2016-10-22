namespace HelloWorldApp.Data
{
    public interface IGreetingDbContextFactory
    {
        GreetingDbContext CreateHelloWorldDbContext();
    }
}