using System;
using System.IO;
using System.Linq;
using ByteSizeLib;
using Serilog;

namespace HelloCoreClrApp.Health
{
    public class DiskMonitor : IMonitor
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<SystemMonitor>();

        public void LogUsage()
        {
            var summary = DriveInfo.GetDrives()
                .Where(drive => drive.DriveType == DriveType.Fixed)
                .Aggregate(string.Empty, (current, drive) =>
                    current + $"{ByteSize.FromBytes(drive.AvailableFreeSpace).GigaBytes:0.00GB} of " +
                    $"{ByteSize.FromBytes(drive.TotalSize).GigaBytes:0.00GB} free for " +
                    $"{drive.Name}{Environment.NewLine}");

            Log.Information("Available disk space:{0}{1}", Environment.NewLine, summary.TrimEnd());
        }
    }
}