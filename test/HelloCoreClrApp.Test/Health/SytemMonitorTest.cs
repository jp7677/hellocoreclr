using System;
using System.Threading;
using System.Threading.Tasks;
using FakeItEasy;
using FluentAssertions;
using HelloCoreClrApp.Health;
using Xunit;

namespace HelloCoreClrApp.Test.Health
{
    public class SytemMonitorTest
    {
        [Fact]
        public async void RunTestAsync()
        {
            var testCts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
            var monitor = A.Fake<IMonitor>();
            var cts = new CancellationTokenSource();
            var sut = new SystemMonitor(new []{monitor});

            var task = sut.Run(cts.Token);

            await Task.Delay(TimeSpan.FromMilliseconds(100), testCts.Token);
            cts.Cancel();
            await Task.Delay(TimeSpan.FromMilliseconds(100), testCts.Token);

            task.Status.Should().Be(TaskStatus.RanToCompletion);
        }
    }
}