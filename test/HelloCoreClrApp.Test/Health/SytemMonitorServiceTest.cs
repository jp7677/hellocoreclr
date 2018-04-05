using System;
using System.Threading;
using System.Threading.Tasks;
using FakeItEasy;
using FluentAssertions;
using HelloCoreClrApp.Health;
using Xunit;

namespace HelloCoreClrApp.Test.Health
{
    public class SytemMonitorServiceTest
    {
        [Fact]
        public async Task ShouldStartAndStopTest()
        {
            var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(500));
            var monitor = A.Fake<IMonitor>();
            var sut = new SystemMonitorService(new []{monitor});

            await sut.Run(cts.Token);

            cts.IsCancellationRequested.Should().BeTrue();
        }
    }
}