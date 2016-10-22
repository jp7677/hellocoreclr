using System;
using System.Linq;
using System.Threading.Tasks;
using HelloWorldApp.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog.Extensions.Logging;

namespace HelloWorldApp.Data
{
    public class DataService : IDataService
    {
        IGreetingDbContextFactory dbContextFactory;

        public DataService(IGreetingDbContextFactory dbContextFactory)
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

        private void RegisterNLog(GreetingDbContext db)
        {
                var serviceProvider = db.GetInfrastructure<IServiceProvider>();
                var loggerFactory = serviceProvider.GetService<ILoggerFactory>();
                loggerFactory.AddProvider(new SerilogLoggerProvider());
        }

        public async Task<int> GetNumberOfGreetingsAsync()
        {
            using(var db = dbContextFactory.CreateHelloWorldDbContext())
            {
                return await db.Greetings.CountAsync();
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

        public async Task<IQueryable<Greeting>> GetLastTenGreetingsAsync(int numberOfResults)
        {
            using(var db = dbContextFactory.CreateHelloWorldDbContext())
            {
                var items = db.Greetings
                    .OrderByDescending(g => g.TimestampUtc)
                    .Take(numberOfResults);

                var list = await items.ToListAsync();
                return list.AsQueryable();
            }
        }
    }
}