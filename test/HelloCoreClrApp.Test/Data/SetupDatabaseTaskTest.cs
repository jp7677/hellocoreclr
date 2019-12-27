using System;
using System.Threading;
using System.Threading.Tasks;
using FakeItEasy;
using FluentAssertions;
using HelloCoreClrApp.Data;
using Microsoft.Extensions.Hosting;
using SimpleInjector;
using Xunit;

namespace HelloCoreClrApp.Test.Data
{
    public sealed class SetupDatabaseTaskTest : IDisposable
    {
        private readonly Container container = new Container();
        private readonly IDataService dataService = A.Fake<IDataService>();
        private readonly IHostApplicationLifetime applicationLifetime = A.Fake<IHostApplicationLifetime>();

        public SetupDatabaseTaskTest()
        {
            container.RegisterInstance(dataService);
        }

        public void Dispose() => container.Dispose();

        [Fact]
        public async Task ShouldRunTest()
        {
            using (var sut = new SetupDatabaseTask(container, applicationLifetime))
            {
                await sut.StartAsync(CancellationToken.None);
                await Task.Delay(TimeSpan.FromMilliseconds(500), CancellationToken.None);
                using (var cts = new CancellationTokenSource(TimeSpan.FromSeconds(2)))
                {
                    await sut.StopAsync(cts.Token);

                    // Assert that sut stopped gracefully
                    cts.IsCancellationRequested.Should().BeFalse();
                    A.CallTo(() => applicationLifetime.StopApplication()).MustNotHaveHappened();
                }
            }
        }

        [Fact]
        public async Task ShouldStopApplicationWhenFailsTest()
        {
            A.CallTo(() => dataService.EnsureCreated(A<CancellationToken>._)).Throws<InvalidOperationException>();
            using (var sut = new SetupDatabaseTask(container, applicationLifetime))
            {
                await sut.StartAsync(CancellationToken.None);
                await Task.Delay(TimeSpan.FromMilliseconds(500), CancellationToken.None);

                A.CallTo(() => applicationLifetime.StopApplication()).MustHaveHappenedOnceExactly();
            }
        }
    }
}