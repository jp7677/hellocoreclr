using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace HelloCoreClrApp.Hosting
{
    public class GracefulShutdownService : IHostedService
    {
        private readonly IApplicationLifetime applicationLifetime;
        private readonly GracefulShutdownServiceOptions options;

        public GracefulShutdownService(IApplicationLifetime applicationLifetime, IOptions<GracefulShutdownServiceOptions> options)
        {
            this.applicationLifetime = applicationLifetime;
            this.options = options?.Value;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            applicationLifetime.ApplicationStopping.Register(OnStopping);
            applicationLifetime.ApplicationStopped.Register(OnStopped);

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
                Console.WriteLine("OnStopping failed, exit anyway. Exception was: {0}", exception);
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
                Console.WriteLine("OnStopped failed, exit anyway. Exception was: {0}", exception);
            }
        }
    }
}