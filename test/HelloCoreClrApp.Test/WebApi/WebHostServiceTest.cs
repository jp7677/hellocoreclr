using System;
using System.Threading;
using System.Threading.Tasks;
using FakeItEasy;
using FluentAssertions;
using HelloCoreClrApp.WebApi;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using SimpleInjector;
using Xunit;

namespace HelloCoreClrApp.Test.WebApi
{
    public sealed class WebHostServiceTest : IDisposable
    {
        private readonly Container container = new Container();
        private readonly IConfiguration configuration = A.Fake<IConfiguration>();
        private readonly IHostApplicationLifetime applicationLifetime = A.Fake<IHostApplicationLifetime>();

        public WebHostServiceTest()
        {
            container.RegisterInstance(configuration);
        }

        public void Dispose() => container.Dispose();

        [Fact]
        public async Task ShouldStartAndStopTest()
        {
            using (var sut = new WebHostService(container, applicationLifetime))
            {
                await sut.StartAsync(CancellationToken.None);
                await Task.Delay(TimeSpan.FromMilliseconds(500), CancellationToken.None);
                using (var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1)))
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
            A.CallTo(() => configuration.GetChildren()).Throws<InvalidOperationException>();
            using (var sut = new WebHostService(container, applicationLifetime))
            {
                await sut.StartAsync(CancellationToken.None);
                await Task.Delay(TimeSpan.FromMilliseconds(500), CancellationToken.None);

                A.CallTo(() => applicationLifetime.StopApplication()).MustHaveHappenedOnceExactly();
            }
        }
    }
}
