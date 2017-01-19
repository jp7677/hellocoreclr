using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ByteSizeLib;
using Serilog;

namespace HelloCoreClrApp.SystemMonitor
{
    public class SystemMonitorTask
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<SystemMonitorTask>();

        public static Task Run(CancellationToken token)
        {
            return Task.Run(async () =>
            {
                await Monitor(token);
            }, token);
        }

        private static async Task Monitor(CancellationToken token)
        {
            while (!token.IsCancellationRequested)
            {
                LogDiskSpace();
                await Delay(token);
            }
            Log.Information("System monitor shutdown");
        }

        private static void LogDiskSpace()
        {
            var summary = DriveInfo.GetDrives()
                .Where(drive => drive.DriveType == DriveType.Fixed)
                .Aggregate(string.Empty, (current, drive) =>
                    current + $"{ByteSize.FromBytes(drive.AvailableFreeSpace).GigaBytes:0.00GB} of " +
                    $"{ByteSize.FromBytes(drive.TotalSize).GigaBytes:0.00GB} free for " +
                    $"{drive.Name}{Environment.NewLine}");
            Log.Information("Available disk space:{0}{1}", Environment.NewLine, summary);
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