using System;
using System.Diagnostics;
using Serilog;

namespace HelloCoreClrApp.Health
{
    public class CpuMonitor : IMonitor
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<CpuMonitor>();

        public void LogUsage()
        {
            var runningTime = DateTime.Now - Process.GetCurrentProcess().StartTime;
            var usage = (double)Process.GetCurrentProcess().TotalProcessorTime.Ticks / runningTime.Ticks
                        / Environment.ProcessorCount;
            usage = Math.Round(usage * 100, 2);

            Log.Information(
                "CPU time since application start:{0}",
                $"{Environment.NewLine}{usage}% for {Process.GetCurrentProcess().ProcessName}");
        }
    }
}