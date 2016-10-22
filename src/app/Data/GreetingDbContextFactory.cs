using Microsoft.EntityFrameworkCore;

namespace HelloWorldApp.Data
{
    public class GreetingDbContextFactory : IGreetingDbContextFactory
    {
        private DbContextOptions<GreetingDbContext> options;

        public GreetingDbContextFactory(DbContextOptions<GreetingDbContext> options)
        {
            this.options = options;
        }

        public GreetingDbContext CreateHelloWorldDbContext()
        {
            return new GreetingDbContext(options);
        }
    }
}