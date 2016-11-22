using System;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.Data.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace HelloCoreClrApp.Test
{
    public class TestserverStartup : Startup
    {
        public TestserverStartup(IHostingEnvironment env)
            : base(env)
        {
        }
        
        public override DbContextOptionsBuilder<GreetingDbContext> CreateDatabaseOptions()
        {
            var builder = new DbContextOptionsBuilder<GreetingDbContext>()
                .UseInMemoryDatabase("TestserverStartup");

            SeedDatabase(builder.Options);

            return builder;
        }

        private void SeedDatabase(DbContextOptions<GreetingDbContext> options)
        {
            using (var db = new GreetingDbContext(options))
            {
                db.Greetings.Add(new Greeting{Name = "First Greeting", TimestampUtc = DateTime.Now.ToUniversalTime()});
                db.Greetings.Add(new Greeting{Name = "Second Greeting", TimestampUtc = DateTime.Now.ToUniversalTime()});
                db.SaveChanges();
            }
        }
    }
}