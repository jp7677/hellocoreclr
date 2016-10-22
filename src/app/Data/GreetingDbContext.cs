using System.Threading.Tasks;
using HelloWorldApp.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace HelloWorldApp.Data
{
    public class GreetingDbContext : DbContext
    {
        public GreetingDbContext()
        { }
        
        public GreetingDbContext(DbContextOptions<GreetingDbContext> options)
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