using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Serilog;
using SimpleInjector;

namespace HelloCoreClrApp.Health
{
    public class SystemMonitorService : BackgroundService
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<SystemMonitorService>();
        private readonly IHostApplicationLifetime hostApplicationLifetime;
        private readonly IEnumerable<IMonitor> monitors;

        public SystemMonitorService(Container container, IHostApplicationLifetime hostApplicationLifetime)
        {
            this.hostApplicationLifetime = hostApplicationLifetime;
            monitors = container.GetAllInstances<IMonitor>();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            Log.Information("Starting System monitor");
            try
            {
                await Monitor(stoppingToken);
                Log.Information("System monitor stopped");
            }
            catch (Exception exception)
            {
                Log.Fatal(exception, "System monitor failed with {exception}", exception.Message);
                hostApplicationLifetime.StopApplication();
            }
        }

        private static async Task Delay(CancellationToken token)
        {
            try
            {
                await Task.Delay(TimeSpan.FromSeconds(60), token);
            }
            catch (TaskCanceledException)
            {
                // ignore
            }
        }

        private async Task Monitor(CancellationToken token)
        {
            while (!token.IsCancellationRequested)
            {
                foreach (var monitor in monitors)
                    monitor.LogUsage();

                await Delay(token);
            }

            Log.Information("System monitor shutdown");
        }
    }
}