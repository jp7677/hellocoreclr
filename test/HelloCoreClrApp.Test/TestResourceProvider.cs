using System;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.Data.Entities;
using Microsoft.EntityFrameworkCore;
using SimpleInjector;

namespace HelloCoreClrApp.Test
{
    public class TestResourceProvider : ResourceProvider
    {
        public TestResourceProvider(Container container)
            : base(container)
        {
        }

        public override DbContextOptionsBuilder<GreetingDbContext> CreateDatabaseOptions()
        {
            var builder = new DbContextOptionsBuilder<GreetingDbContext>()
                .UseInMemoryDatabase("TestResourceProvider");

            SeedDatabase(builder.Options);

            return builder;
        }

        private static void SeedDatabase(DbContextOptions options)
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