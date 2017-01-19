using System;
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
            var log = ConfigureSerilog(configuration);
            SetupResourceProvider();

            try
            {
                Task.WaitAll(
                    ShutdownHandlerTask.Run(ShutdownCancellationTokenSource),
                    SetupDatabaseTask.RunAsync(Container),
                    WebHostTask.Run(configuration, Container, ShutdownCancellationTokenSource.Token),
                    SystemMonitorTask.Run(ShutdownCancellationTokenSource.Token));
            }
            catch (Exception ae)
            {
                log.Error(ae, "Shutdown unexpectedly ended");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            return new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();
        }

        private static ILogger ConfigureSerilog(IConfiguration configuration)
        {
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .CreateLogger();

            return Log.ForContext<Program>();
        }

        private static void SetupResourceProvider()
        {
            var resourceProvider = new ResourceProvider(Container);
            resourceProvider.SetupApplicationComponents();
        }
    }
}
