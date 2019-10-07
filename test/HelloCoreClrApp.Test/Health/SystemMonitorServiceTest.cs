using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FakeItEasy;
using FluentAssertions;
using HelloCoreClrApp.Health;
using Microsoft.Extensions.Hosting;
using SimpleInjector;
using Xunit;

namespace HelloCoreClrApp.Test.Health
{
    public class SystemMonitorServiceTest
    {
        private readonly Container container = new Container();
        private readonly IMonitor monitor = A.Fake<IMonitor>();
        private readonly IHostApplicationLifetime applicationLifetime = A.Fake<IHostApplicationLifetime>();

        public SystemMonitorServiceTest()
        {
            container.RegisterInstance((IEnumerable<IMonitor>)new[] { monitor });
        }

        [Fact]
        public async Task ShouldStartAndStopTest()
        {
            var sut = new SystemMonitorService(container, applicationLifetime);

            await sut.StartAsync(CancellationToken.None);
            await Task.Delay(TimeSpan.FromMilliseconds(500), CancellationToken.None);
            var cts = new CancellationTokenSource(TimeSpan.FromSeconds(2));
            await sut.StopAsync(cts.Token);

            // Assert that sut stopped gracefully
            cts.IsCancellationRequested.Should().BeFalse();
            A.CallTo(() => applicationLifetime.StopApplication()).MustNotHaveHappened();
        }

        [Fact]
        public async Task ShouldStopApplicationWhenFailsTest()
        {
            A.CallTo(() => monitor.LogUsage()).Throws<InvalidOperationException>();
            var sut = new SystemMonitorService(container, applicationLifetime);

            await sut.StartAsync(CancellationToken.None);
            await Task.Delay(TimeSpan.FromMilliseconds(500), CancellationToken.None);

            A.CallTo(() => applicationLifetime.StopApplication()).MustHaveHappenedOnceExactly();
        }
    }
}