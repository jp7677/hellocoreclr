using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HelloWorldApp
{
    public class HelloWorldDbContext : DbContext, IHelloWorldDbContext
    {
        public DbSet<Greeting> Greetings { get; set; }

        public async Task SaveChangesAsync()
        {
            await base.SaveChangesAsync();
        }

        public async Task EnsureCreatedAsync()
        {
            await Database.EnsureCreatedAsync();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=./helloworld.db");
        }
    }
}