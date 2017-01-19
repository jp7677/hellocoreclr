using System;
using System.Reflection;
using System.Runtime.Loader;
using System.Threading;
using System.Threading.Tasks;
using Serilog;

namespace HelloCoreClrApp
{
    public class ShutdownHandlerTask
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<ShutdownHandlerTask>();

        public static Task Run(CancellationTokenSource shutdownCancellationTokenSource)
        {
            return Task.Run(() =>
            {
                Configure(shutdownCancellationTokenSource);
            }, shutdownCancellationTokenSource.Token);
        }

        private static void Configure(CancellationTokenSource shutdownCancellationTokenSource)
        {
            Log.Information("Setup shutdown handler.");
            var loadContext = AssemblyLoadContext.GetLoadContext(Assembly.GetEntryAssembly());
            loadContext.Unloading += ctx =>
                Cancel("Application unloading, probably SIGTERM", shutdownCancellationTokenSource);
            Console.CancelKeyPress += (s, e) =>
            {
                e.Cancel = true;
                Cancel(e.SpecialKey == ConsoleSpecialKey.ControlC ? "SIGINT" : "SIGQUIT", shutdownCancellationTokenSource);
            };
        }

        private static void Cancel(string signal, CancellationTokenSource shutdownCancellationTokenSource)
        {
            Log.Information("{0} received, initiating shutdown.", signal);
            if (!shutdownCancellationTokenSource.IsCancellationRequested)
                shutdownCancellationTokenSource.Cancel();
        }
    }
}