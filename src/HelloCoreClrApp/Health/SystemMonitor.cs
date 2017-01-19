using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Serilog;

namespace HelloCoreClrApp.Health
{
    public class SystemMonitor
    {
        private readonly IEnumerable<IMonitor> monitors;
        private static readonly ILogger Log = Serilog.Log.ForContext<SystemMonitor>();

        public SystemMonitor(IEnumerable<IMonitor> monitors)
        {
            this.monitors = monitors;
        }

        public Task Run(CancellationToken token)
        {
            return Task.Run(async () =>
            {
                await Monitor(token);
            }, token);
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