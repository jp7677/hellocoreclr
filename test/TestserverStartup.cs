using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace HelloWorldApp.Test
{
    public class TestserverStartup : Startup
    {
        public TestserverStartup(IHostingEnvironment env)
            : base(env)
        {
        }
        
        public override DbContextOptionsBuilder<HelloWorldDbContext> CreateDatabaseOptions()
        {
            return new DbContextOptionsBuilder<HelloWorldDbContext>()
                .UseInMemoryDatabase();
        }
    }
}