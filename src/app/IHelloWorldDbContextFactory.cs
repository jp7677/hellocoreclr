namespace HelloWorldApp
{
    public interface IHelloWorldDbContextFactory
    {
        HelloWorldDbContext CreateHelloWorldDbContext();
    }
}