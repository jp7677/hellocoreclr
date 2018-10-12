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
        [Fact]
        public async Task ShouldRunTest()
        {
            var container = new Container();
            container.RegisterInstance(A.Fake<IDataService>());
            var sut = new SetupDatabaseTask(container, A.Fake<IApplicationLifetime>());

            var cts = new CancellationTokenSource(TimeSpan.FromSeconds(2));
            await sut.StartAsync(CancellationToken.None);
            await sut.StopAsync(cts.Token);

            // Assert that sut stopped gracefully
            cts.IsCancellationRequested.Should().BeFalse();
        }
    }
}