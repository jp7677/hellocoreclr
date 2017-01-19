using System;
using System.Threading;
using System.Threading.Tasks;
using Serilog;

namespace HelloCoreClrApp.Health
{
    public class SystemMonitor
    {
        private readonly IMonitor diskMonitor;
        private static readonly ILogger Log = Serilog.Log.ForContext<SystemMonitor>();

        public SystemMonitor(IMonitor diskMonitor)
        {
            this.diskMonitor = diskMonitor;
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
                diskMonitor.LogUsage();
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