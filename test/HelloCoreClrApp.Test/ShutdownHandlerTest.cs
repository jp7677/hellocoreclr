using System.Threading;
using FluentAssertions;
using Xunit;

namespace HelloCoreClrApp.Test
{
    public class ShutdownHandlerTest
    {
        [Fact]
        public void ConfigureShouldNotFailTest()
        {
            var cts = new CancellationTokenSource();
            ShutdownHandler.Configure(cts);

            cts.IsCancellationRequested.Should().Be(false);
        }
    }
}
