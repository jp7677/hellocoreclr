using System;
using System.Threading;
using FakeItEasy;
using HelloCoreClrApp.WebApi;
using Microsoft.Extensions.Configuration;
using SimpleInjector;
using Xunit;

namespace HelloCoreClrApp.Test.WebApi
{
    public class WebHostTaskTest
    {
        [Fact]
        public async void RunTestAsync()
        {
            Startup.Container = new Container();
            var conf = A.Fake<IConfiguration>();
            var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
            await WebHostTask.Run(conf, cts.Token);
        }
    }
}
