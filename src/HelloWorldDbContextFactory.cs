using Microsoft.EntityFrameworkCore;

namespace HelloWorldApp
{
    public class HelloWorldDbContextFactory : IHelloWorldDbContextFactory
    {
        private DbContextOptions<HelloWorldDbContext> options;

        public HelloWorldDbContextFactory(DbContextOptions<HelloWorldDbContext> options)
        {
            this.options = options;
        }

        public IHelloWorldDbContext CreateHelloWorldDbContext()
        {
            return (IHelloWorldDbContext) new HelloWorldDbContext(options);
        }
    }
}