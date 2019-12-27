using System;
using System.Threading;
using System.Threading.Tasks;
using FakeItEasy;
using FluentAssertions;
using HelloCoreClrApp.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Xunit;

namespace HelloCoreClrApp.Test.Hosting
{
    public class GracefulShutdownServiceTest
    {
        [Fact]
        public async Task ServiceShouldStartAndStopTest()
        {
            var hostApplicationLifetime = A.Fake<IHostApplicationLifetime>();
            var options = A.Fake<IOptions<GracefulShutdownServiceOptions>>();

            var sut = new GracefulShutdownService(hostApplicationLifetime, options);

            await sut.StartAsync(CancellationToken.None);
            await sut.StopAsync(CancellationToken.None);
        }

        [Fact]
        public async Task DelegatesShouldBeCalledTest()
        {
            using var stoppingCancellationTokenSource = new CancellationTokenSource();
            using var stoppedCancellationTokenSource = new CancellationTokenSource();

            var hostApplicationLifetime = A.Fake<IHostApplicationLifetime>();
            A.CallTo(() => hostApplicationLifetime.ApplicationStopping)
                .Returns(stoppingCancellationTokenSource.Token);
            A.CallTo(() => hostApplicationLifetime.ApplicationStopped)
                .Returns(stoppedCancellationTokenSource.Token);

            var onStoppingCalled = false;
            var onStoppedCalled = false;
            var gracefulShutdownServiceOptions = new GracefulShutdownServiceOptions
            {
                OnStopping = () => { onStoppingCalled = true; },
                OnStopped = () => { onStoppedCalled = true; }
            };

            var options = A.Fake<IOptions<GracefulShutdownServiceOptions>>();
            A.CallTo(() => options.Value).Returns(gracefulShutdownServiceOptions);

            var sut = new GracefulShutdownService(hostApplicationLifetime, options);

            await sut.StartAsync(CancellationToken.None);

            stoppingCancellationTokenSource.Cancel();
            stoppedCancellationTokenSource.Cancel();
            onStoppingCalled.Should().BeTrue();
            onStoppedCalled.Should().BeTrue();
        }

        [Fact]
        public async Task DelegatesShouldNotThrowTest()
        {
            using var stoppingCancellationTokenSource = new CancellationTokenSource();
            using var stoppedCancellationTokenSource = new CancellationTokenSource();

            var hostApplicationLifetime = A.Fake<IHostApplicationLifetime>();
            A.CallTo(() => hostApplicationLifetime.ApplicationStopping)
                .Returns(stoppingCancellationTokenSource.Token);
            A.CallTo(() => hostApplicationLifetime.ApplicationStopped)
                .Returns(stoppedCancellationTokenSource.Token);

            var gracefulShutdownServiceOptions = new GracefulShutdownServiceOptions
            {
                OnStopping = () => throw new InvalidOperationException(),
                OnStopped = () => throw new InvalidOperationException()
            };

            var options = A.Fake<IOptions<GracefulShutdownServiceOptions>>();
            A.CallTo(() => options.Value).Returns(gracefulShutdownServiceOptions);

            var sut = new GracefulShutdownService(hostApplicationLifetime, options);

            await sut.StartAsync(CancellationToken.None);

            stoppingCancellationTokenSource.Cancel();
            stoppedCancellationTokenSource.Cancel();
        }
    }
}