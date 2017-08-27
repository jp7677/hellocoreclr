using System.IO;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.Health;
using HelloCoreClrApp.WebApi;
using Microsoft.Extensions.Configuration;
using Serilog;
using SimpleInjector;

namespace HelloCoreClrApp
{
    public static class Program
    {
        private static readonly CancellationTokenSource ShutdownCancellationTokenSource = new CancellationTokenSource();
        private static readonly Container Container = new Container();

        // Entry point for the application.
        public static void Main(string[] args)
        {
            var configuration = BuildConfiguration();
            ConfigureLogging(configuration);
            SetCurrentWorkingDirectory();
            SetupResources(configuration);

            Task.WaitAll(
                ConfigureShutdownHandler(),
                SetupDatabase());

            Task.WaitAll(
                RunWebHostService(configuration, ShutdownCancellationTokenSource.Token),
                RunSystemMonitorService(ShutdownCancellationTokenSource.Token));
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

            Log.Information("{0} {1}",
                Assembly.GetEntryAssembly().GetName().Name,
                Assembly.GetEntryAssembly().GetCustomAttribute<AssemblyInformationalVersionAttribute>().InformationalVersion);
        }

        private static void SetCurrentWorkingDirectory()
        {
            var cwd = new FileInfo(Assembly.GetEntryAssembly().Location).DirectoryName;
            Log.Warning("Set current working directory to {0}", cwd);
            Directory.SetCurrentDirectory(cwd);
        }

        private static void SetupResources(IConfiguration configuration)
        {
            var componentRegistrar = new ComponentRegistrar(Container)
            {
                DatabaseOptionsBuilder = DatabaseOptionsBuilderFactory
                    .CreateDatabaseOptionsBuilder(configuration["connectionString"])
            };
            componentRegistrar.RegisterApplicationComponents();
        }

        private static Task ConfigureShutdownHandler()
        {
            return Task.Run(() =>
                ShutdownHandler.Configure(ShutdownCancellationTokenSource));
        }

        private static Task SetupDatabase()
        {
            return Container.GetInstance<SetupDatabaseTask>()
                .RunAsync();
        }

        private static async Task RunWebHostService(IConfiguration configuration, CancellationToken token)
        {
            await Container.GetInstance<WebHostService>()
                .Run(Container, configuration, token);
        }

        private static async Task RunSystemMonitorService(CancellationToken token)
        {
            await Container.GetInstance<SystemMonitorService>()
                .Run(token);
        }
    }
}
