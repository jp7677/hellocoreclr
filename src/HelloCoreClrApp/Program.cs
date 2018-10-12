using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.Health;
using HelloCoreClrApp.WebApi;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using SimpleInjector;

namespace HelloCoreClrApp
{
    public static class Program
    {
        private static readonly Container Container = new Container();
        private static string currentWorkingDirectory;

        // Entry point for the application.
        public static async Task Main(string[] args)
        {
            var configuration = BuildConfiguration();
            ConfigureLogging(configuration);
            SetupResources(configuration);

            var hostBuilder = new HostBuilder()
                .ConfigureHostConfiguration(host =>
                {
                    host.SetBasePath(currentWorkingDirectory);
                })
                .ConfigureAppConfiguration((context, app) =>
                {
                    app.SetBasePath(currentWorkingDirectory);
                    context.HostingEnvironment.EnvironmentName = GetEnvironmentName();
                })
                .ConfigureServices((context, services) =>
                {
                    services.AddSingleton(Container);
                    services.AddHostedService<SetupDatabaseTask>();
                    services.AddHostedService<WebHostService>();
                    services.AddHostedService<SystemMonitorService>();
                });

            await hostBuilder.RunConsoleAsync();
            Log.CloseAndFlush();
        }

        public static string GetEnvironmentName() =>
            Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";

        public static string GetCurrentWorkingDirectory()
        {
            if (string.IsNullOrEmpty(currentWorkingDirectory))
                SetCurrentWorkingDirectory();

            return currentWorkingDirectory;
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            return new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .Build();
        }

        private static void ConfigureLogging(IConfiguration configuration)
        {
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .CreateLogger();

            Log.Information(
                "{0} {1} on .NET Core Runtime {2}",
                Assembly.GetEntryAssembly().GetName().Name,
                Assembly.GetEntryAssembly().GetCustomAttribute<AssemblyInformationalVersionAttribute>().InformationalVersion,
                NetCoreHelper.GetNetCoreVersion());
        }

        private static void SetCurrentWorkingDirectory()
        {
            currentWorkingDirectory = new FileInfo(Assembly.GetEntryAssembly().Location).DirectoryName;
            Log.Warning("Set current working directory to {0}", currentWorkingDirectory);
            Directory.SetCurrentDirectory(currentWorkingDirectory);
        }

        private static void SetupResources(IConfiguration configuration)
        {
            var componentRegistrar = new ComponentRegistrar(Container)
            {
                DatabaseOptionsBuilder = DatabaseOptionsBuilderFactory
                    .CreateDatabaseOptionsBuilder(configuration["connectionString"])
            };
            componentRegistrar.RegisterApplicationComponents(configuration);
        }
    }
}
