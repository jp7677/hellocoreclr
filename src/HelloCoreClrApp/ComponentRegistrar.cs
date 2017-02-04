using System;
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
    public sealed class ComponentRegistrar
    {
        private readonly Container container;

        public ComponentRegistrar(Container container)
        {
            this.container = container;
        }

        public DbContextOptionsBuilder<GreetingDbContext> DatabaseOptionsBuilder { private get; set; }

        public void RegisterApplicationComponents()
        {
            Log.Information("Setup application components.");
            if (DatabaseOptionsBuilder == null)
                throw new InvalidOperationException("DatabaseOptionsBuilder needs to be set.");

            container.Options.DefaultScopedLifestyle = new AspNetRequestLifestyle();

            container.RegisterSingleton<IResourceProvider, ResourceProvider>();

            container.RegisterSingleton<IGreetingDbContextFactory>(() =>
                new GreetingDbContextFactory(DatabaseOptionsBuilder.Options));
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
    }
}