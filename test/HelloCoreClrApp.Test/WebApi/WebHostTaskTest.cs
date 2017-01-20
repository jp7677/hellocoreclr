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
    public class WebHostTaskTest
    {
        [Fact]
        public async Task ShouldStartAndStopTestAsync()
        {
            Startup.Container = new Container();
            var conf = A.Fake<IConfiguration>();
            var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(500));
            await WebHostTask.Run(conf, cts.Token);

            cts.IsCancellationRequested.Should().BeTrue();
        }
    }
}
