using System.Threading;
using System.Threading.Tasks;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.SystemMonitor;
using HelloCoreClrApp.WebApi;
using Microsoft.Extensions.Configuration;
using Serilog;
using SimpleInjector;

namespace HelloCoreClrApp
{
    public class Program
    {
        private static readonly CancellationTokenSource ShutdownCancellationTokenSource = new CancellationTokenSource();
        private static readonly Container Container = new Container();

        // Entry point for the application.
        public static void Main(string[] args)
        {
            var configuration = BuildConfiguration();
            ConfigureSerilog(configuration);
            SetupResourceProvider();

            Task.WaitAll(
                ConfigureShutdownHandler(),
                SetupDatabase());

            Task.WaitAll(
                WebHostTask.Run(configuration, ShutdownCancellationTokenSource.Token),
                SystemMonitorTask.Run(ShutdownCancellationTokenSource.Token));

            Log.CloseAndFlush();
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            return new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();
        }

        private static void ConfigureSerilog(IConfiguration configuration)
        {
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .CreateLogger();
        }

        private static void SetupResourceProvider()
        {
            var resourceProvider = new ResourceProvider(Container);
            resourceProvider.SetupApplicationComponents();
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
    }
}
