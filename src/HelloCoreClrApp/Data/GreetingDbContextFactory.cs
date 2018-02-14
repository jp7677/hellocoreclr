using Microsoft.EntityFrameworkCore;

namespace HelloCoreClrApp.Data
{
    public class GreetingDbContextFactory : IGreetingDbContextFactory
    {
        private readonly DbContextOptions<GreetingDbContext> options;

        public GreetingDbContextFactory(DbContextOptions<GreetingDbContext> options)
        {
            this.options = options;
        }

        public GreetingDbContext CreateHelloWorldDbContext() => new GreetingDbContext(options);
    }
}