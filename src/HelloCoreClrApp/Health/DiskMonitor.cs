using System;
using System.IO;
using System.Linq;
using Humanizer.Bytes;
using Serilog;

namespace HelloCoreClrApp.Health
{
    public class DiskMonitor : IMonitor
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<DiskMonitor>();

        public void LogUsage()
        {
            var summary = DriveInfo.GetDrives()
                .Where(drive => 
                    (drive.DriveType == DriveType.Fixed || drive.DriveType == DriveType.Unknown) 
                    && drive.TotalSize > 0)
                .Aggregate(string.Empty, (current, drive) =>
                    current + $"{ByteSize.FromBytes(drive.AvailableFreeSpace).Gigabytes:0.00G} of " +
                    $"{ByteSize.FromBytes(drive.TotalSize).Gigabytes:0.00G} free for " +
                    $"{drive.Name}{Environment.NewLine}");

            Log.Information("Available disk space:{0}{1}", Environment.NewLine, summary.TrimEnd());
        }
    }
}