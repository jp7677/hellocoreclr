using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Humanizer;
using Serilog;

namespace HelloCoreClrApp.Health
{
    public class SystemMonitorService
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<SystemMonitorService>();
        private readonly IEnumerable<IMonitor> monitors;

        public SystemMonitorService(IEnumerable<IMonitor> monitors)
        {
            this.monitors = monitors;
        }

        public async Task Run(CancellationToken token)
        {
            await Task
                .Run(
                    async () =>
                    {
                        Log.Information("Starting System monitor.");
                        await Monitor(token);
                    }, token)
                .ContinueWith(
                    t => Log.Information("System monitor {0}", t.Status.Humanize().Transform(To.LowerCase)),
                    TaskContinuationOptions.None);
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
    }
}