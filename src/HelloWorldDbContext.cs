using Microsoft.EntityFrameworkCore;

namespace HelloWorldApp
{
    public class HelloWorldDbContext : DbContext, IHelloWorldDbContext
    {
        public DbSet<Greeting> Greetings { get; set; }

        public void Save()
        {
            SaveChanges();
        }

        public void EnsureCreated()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=./helloworld.db");
        }
    }
}