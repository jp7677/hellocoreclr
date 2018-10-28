using HelloCoreClrApp.Hosting;
using Microsoft.Extensions.Hosting;
using Xunit;

namespace HelloCoreClrApp.Test.Hosting
{
    public class GracefulShutdownServiceExtensionsTest
    {
        [Fact]
        public void UseGracefulShutdownShouldBuildTest()
        {
            var hostBuilder = new HostBuilder()
                .UseGracefulShutdown(options =>
                {
                    options.OnStopping = () => { };
                    options.OnStopped = () => { };
                });

            hostBuilder.Build();
        }
    }
}
