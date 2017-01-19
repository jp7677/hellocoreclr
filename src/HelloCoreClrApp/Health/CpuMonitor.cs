using System.Diagnostics;
using Serilog;

namespace HelloCoreClrApp.Health
{
    public class CpuMonitor: IMonitor
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<SystemMonitor>();

        public void LogUsage()
        {
            Log.Information("Total processor time: {0} {1}",
                Process.GetCurrentProcess().ProcessName,
                Process.GetCurrentProcess().TotalProcessorTime);
        }
    }
}