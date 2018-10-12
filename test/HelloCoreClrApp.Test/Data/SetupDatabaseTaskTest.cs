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
    public class SetupDatabaseTaskTest
    {
        private readonly Container container = new Container();
        private readonly IDataService dataService = A.Fake<IDataService>();
        private readonly IApplicationLifetime applicationLifetime = A.Fake<IApplicationLifetime>();

        public SetupDatabaseTaskTest()
        {
            container.RegisterInstance(dataService);
        }

        [Fact]
        public async Task ShouldRunTest()
        {
            var sut = new SetupDatabaseTask(container, applicationLifetime);

            var cts = new CancellationTokenSource(TimeSpan.FromSeconds(2));
            await sut.StartAsync(CancellationToken.None);
            await sut.StopAsync(cts.Token);

            // Assert that sut stopped gracefully
            cts.IsCancellationRequested.Should().BeFalse();
            A.CallTo(() => applicationLifetime.StopApplication()).MustNotHaveHappened();
        }

        [Fact]
        public async Task ShouldStopApplicationWhenFailsTest()
        {
            A.CallTo(() => dataService.EnsureCreated(A<CancellationToken>._)).Throws<InvalidOperationException>();
            var sut = new SetupDatabaseTask(container, applicationLifetime);

            var cts = new CancellationTokenSource(TimeSpan.FromSeconds(2));
            await sut.StartAsync(CancellationToken.None);

            // Assert that sut stopped gracefully
            cts.IsCancellationRequested.Should().BeFalse();
            A.CallTo(() => applicationLifetime.StopApplication()).MustHaveHappenedOnceExactly();
        }
    }
}