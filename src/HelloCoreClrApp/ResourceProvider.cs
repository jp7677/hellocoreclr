using HelloCoreClrApp.Data;
using HelloCoreClrApp.Health;
using HelloCoreClrApp.WebApi;
using HelloCoreClrApp.WebApi.Actions;
using Microsoft.EntityFrameworkCore;
using Serilog;
using SimpleInjector;
using SimpleInjector.Integration.AspNetCore;

namespace HelloCoreClrApp
{
    public class ResourceProvider : IResourceProvider
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<ResourceProvider>();
        private readonly Container container;

        public ResourceProvider(Container container)
        {
            this.container = container;
        }

        public void RegisterApplicationComponents()
        {
            Log.Information("Setup application components.");
            container.Options.DefaultScopedLifestyle = new AspNetRequestLifestyle();

            container.RegisterSingleton<IResourceProvider>(this);

            container.RegisterSingleton<IGreetingDbContextFactory>(() =>
                new GreetingDbContextFactory(CreateDatabaseOptions().Options));
            container.Register<IDataService,DataService>();

            container.RegisterSingleton<WebHostService>();
            container.RegisterSingleton<IActionFactory, ActionFactory>();
            container.Register<ISayHelloWorldAction, SayHelloWorldAction>();
            container.Register<IGetLastTenGreetingsAction, GetLastTenHelloWorldsAction>();
            container.Register<IGetTotalNumberOfGreetingsAction, GetTotalNumberOfGreetingsAction>();

            container.RegisterSingleton<SystemMonitorService>();
            container.RegisterCollection<IMonitor>(new [] {typeof(DiskMonitor), typeof(CpuMonitor)});

            container.Verify();

            Startup.Container = container;
        }

        public virtual DbContextOptionsBuilder<GreetingDbContext> CreateDatabaseOptions()
        {
            return new DbContextOptionsBuilder<GreetingDbContext>()
                .UseSqlite("Filename=./helloworld.db");
        }

        public T CreateResource<T>() where T : class
        {
            return container.GetInstance<T>();
        }
    }
}
