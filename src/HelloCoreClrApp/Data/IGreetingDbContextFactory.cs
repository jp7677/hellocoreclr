namespace HelloCoreClrApp.Data
{
    public interface IGreetingDbContextFactory
    {
        GreetingDbContext CreateHelloWorldDbContext();
    }
}