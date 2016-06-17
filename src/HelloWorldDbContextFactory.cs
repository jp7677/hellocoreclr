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

        public HelloWorldDbContext CreateHelloWorldDbContext()
        {
            return new HelloWorldDbContext(options);
        }
    }
}