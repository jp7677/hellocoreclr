using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HelloWorldApp
{
    public class HelloWorldDbContext : DbContext, IHelloWorldDbContext
    {
        public HelloWorldDbContext(DbContextOptions<HelloWorldDbContext> options)
            : base(options)
        { }

        public DbSet<Greeting> Greetings { get; set; }

        public async Task SaveChangesAsync()
        {
            await base.SaveChangesAsync();
        }

        public async Task EnsureCreatedAsync()
        {
            await Database.EnsureCreatedAsync();
        }
    }
}