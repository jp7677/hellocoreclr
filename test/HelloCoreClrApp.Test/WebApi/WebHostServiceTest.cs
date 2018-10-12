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
        [Fact]
        public async Task ShouldStartAndStopTest()
        {
            var container = new Container();
            container.RegisterInstance(A.Fake<IConfiguration>());
            var sut = new WebHostService(container, A.Fake<IApplicationLifetime>());

            var cts = new CancellationTokenSource(TimeSpan.FromSeconds(2));
            await sut.StartAsync(CancellationToken.None);
            await sut.StopAsync(cts.Token);

            // Assert that sut stopped gracefully
            cts.IsCancellationRequested.Should().BeFalse();
        }
    }
}
