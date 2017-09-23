using System;
using System.Threading;
using System.Threading.Tasks;
using FakeItEasy;
using FluentAssertions;
using HelloCoreClrApp.WebApi;
using Microsoft.Extensions.Configuration;
using SimpleInjector;
using Xunit;

namespace HelloCoreClrApp.Test.WebApi
{
    public class WebHostServiceTest
    {
        [Fact]
        public async Task ShouldStartAndStopTestAsync()
        {
            var container = new Container();
            var configuration = A.Fake<IConfiguration>();
            var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(500));
            var sut = new WebHostService(configuration, container);
            await sut.Run(cts.Token);

            cts.IsCancellationRequested.Should().BeTrue();
        }
    }
}
