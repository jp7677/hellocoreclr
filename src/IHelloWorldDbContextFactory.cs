namespace HelloWorldApp
{
    public interface IHelloWorldDbContextFactory
    {
        IHelloWorldDbContext CreateHelloWorldDbContext();
    }
}