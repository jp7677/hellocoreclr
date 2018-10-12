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
    public class WebHostServiceTest
    {
        private readonly Container container = new Container();
        private readonly IConfiguration configuration = A.Fake<IConfiguration>();
        private readonly IApplicationLifetime applicationLifetime = A.Fake<IApplicationLifetime>();

        public WebHostServiceTest()
        {
            container.RegisterInstance(configuration);
        }

        [Fact]
        public async Task ShouldStartAndStopTest()
        {
            var sut = new WebHostService(container, applicationLifetime);

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
            A.CallTo(() => configuration.GetChildren()).Throws<InvalidOperationException>();
            var sut = new WebHostService(container, applicationLifetime);

            await sut.StartAsync(CancellationToken.None);

            A.CallTo(() => applicationLifetime.StopApplication()).MustHaveHappenedOnceExactly();
        }
    }
}
