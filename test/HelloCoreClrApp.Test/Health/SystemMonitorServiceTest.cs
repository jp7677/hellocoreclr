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
        [Fact]
        public async Task ShouldStartAndStopTest()
        {
            var container = new Container();
            container.RegisterInstance((IEnumerable<IMonitor>)new[] { A.Fake<IMonitor>() });
            var sut = new SystemMonitorService(container, A.Fake<IApplicationLifetime>());

            var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(500));
            await sut.StartAsync(CancellationToken.None);
            await sut.StopAsync(cts.Token);

            // Assert that sut stopped gracefully
            cts.IsCancellationRequested.Should().BeFalse();
        }
    }
}