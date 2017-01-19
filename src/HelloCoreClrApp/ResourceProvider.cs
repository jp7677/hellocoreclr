using HelloCoreClrApp.Data;
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
        private readonly ILogger log = Log.ForContext<ResourceProvider>();
        private readonly Container container;

        public ResourceProvider(Container container)
        {
            this.container = container;
        }

        public void SetupApplicationComponents()
        {
            log.Information("Setup application components.");
            container.Options.DefaultScopedLifestyle = new AspNetRequestLifestyle();

            container.RegisterSingleton<IResourceProvider>(this);

            container.RegisterSingleton<IGreetingDbContextFactory>(() =>
                new GreetingDbContextFactory(CreateDatabaseOptions().Options));
            container.Register<IDataService,DataService>();

            container.RegisterSingleton<IActionFactory, ActionFactory>();
            container.Register<ISayHelloWorldAction, SayHelloWorldAction>();
            container.Register<IGetLastTenGreetingsAction, GetLastTenHelloWorldsAction>();
            container.Register<IGetTotalNumberOfGreetingsAction, GetTotalNumberOfGreetingsAction>();

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
