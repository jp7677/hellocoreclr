using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace HelloCoreClrApp.Hosting
{
    public static class GracefulShutdownServiceExtensions
    {
        public static IHostBuilder UseGracefulShutdown(this IHostBuilder hostBuilder, Action<GracefulShutdownServiceOptions> options)
        {
            return hostBuilder
                .ConfigureServices((hostContext, services) =>
                {
                    services.Configure(options);
                    services.AddHostedService<GracefulShutdownService>();
                });
        }
    }
}
