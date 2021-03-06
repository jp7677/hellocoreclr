using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Serilog;

namespace HelloCoreClrApp.Hosting
{
    public class GracefulShutdownService : IHostedService
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<GracefulShutdownService>();
        private readonly IHostApplicationLifetime hostApplicationLifetime;
        private readonly GracefulShutdownServiceOptions options;

        public GracefulShutdownService(IHostApplicationLifetime hostApplicationLifetime, IOptions<GracefulShutdownServiceOptions> options)
        {
            this.hostApplicationLifetime = hostApplicationLifetime;
            this.options = options?.Value;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            hostApplicationLifetime.ApplicationStopping.Register(OnStopping);
            hostApplicationLifetime.ApplicationStopped.Register(OnStopped);

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        private void OnStopping()
        {
            try
            {
                options?.OnStopping();
            }
            catch (Exception exception)
            {
                Log.Error(exception, "OnStopping failed, exit anyway. Exception was: {0}", exception.Message);
            }
        }

        private void OnStopped()
        {
            try
            {
                options?.OnStopped();
            }
            catch (Exception exception)
            {
                Log.Error(exception, "OnStopped failed, exit anyway. Exception was: {0}", exception.Message);
            }
        }
    }
}