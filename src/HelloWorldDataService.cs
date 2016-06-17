using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace HelloWorldApp
{
    public class HelloWorldDataService : IHelloWorldDataService
    {
        IHelloWorldDbContextFactory dbContextFactory;

        public HelloWorldDataService(IHelloWorldDbContextFactory dbContextFactory)
        {
            this.dbContextFactory = dbContextFactory;
        }

        public async Task EnsureCreatedAsync()
        {
            using(var db = dbContextFactory.CreateHelloWorldDbContext())
            {
                RegisterNLog(db);
                await db.EnsureCreatedAsync();
            }
        }

        private void RegisterNLog(HelloWorldDbContext db)
        {
                var serviceProvider = db.GetInfrastructure<IServiceProvider>();
                var loggerFactory = serviceProvider.GetService<ILoggerFactory>();
                loggerFactory.AddProvider(new NLogLoggerProvider());
        }

        public int GetNumberOfGreetings()
        {
            using(var db = dbContextFactory.CreateHelloWorldDbContext())
            {
                return db.Greetings.Count();
            }
        }

        public async Task SaveGreetingAsync(string greeting)
        {
            using(var db = dbContextFactory.CreateHelloWorldDbContext())
            {
                db.Greetings.Add(new Greeting
                    {
                        Name = greeting,
                        TimestampUtc = DateTime.Now.ToUniversalTime()
                    });
                await db.SaveChangesAsync();
            }
        }
    }
}