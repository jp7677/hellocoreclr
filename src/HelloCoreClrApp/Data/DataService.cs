using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HelloCoreClrApp.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog.Extensions.Logging;

namespace HelloCoreClrApp.Data
{
    public sealed class DataService : IDataService, IDisposable
    {
        private readonly SerilogLoggerProvider loggerProvider = new SerilogLoggerProvider();
        private readonly IGreetingDbContextFactory dbContextFactory;

        public DataService(IGreetingDbContextFactory dbContextFactory)
        {
            this.dbContextFactory = dbContextFactory;
        }

        public void Dispose() => loggerProvider?.Dispose();

        public async Task EnsureCreated(CancellationToken token)
        {
            await using var db = dbContextFactory.CreateHelloWorldDbContext();
            RegisterSeriLog(db);
            await db.EnsureCreated(token);
        }

        public async Task<int> GetNumberOfGreetings()
        {
            await using var db = dbContextFactory.CreateHelloWorldDbContext();
            return await db.Greetings.CountAsync();
        }

        public async Task SaveGreeting(string greeting)
        {
            await using var db = dbContextFactory.CreateHelloWorldDbContext();
            await db.Greetings.AddAsync(new Greeting
            {
                Name = greeting,
                TimestampUtc = DateTime.Now.ToUniversalTime()
            });
            await db.SaveChangesAsync();
        }

        public async Task<IList<Greeting>> GetLastTenGreetings(int numberOfResults)
        {
            await using var db = dbContextFactory.CreateHelloWorldDbContext();
            var items = db.Greetings
                .OrderByDescending(g => g.TimestampUtc)
                .Take(numberOfResults)
                .AsNoTracking();

            return await items.ToListAsync();
        }

        private void RegisterSeriLog(GreetingDbContext db)
        {
            var serviceProvider = db.GetInfrastructure();
            var loggerFactory = serviceProvider.GetService<ILoggerFactory>();
            loggerFactory.AddProvider(loggerProvider);
        }
    }
}