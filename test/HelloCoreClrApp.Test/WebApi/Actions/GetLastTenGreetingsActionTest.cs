using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.Data.Entities;
using HelloCoreClrApp.WebApi.Actions;
using FakeItEasy;
using Xunit;

namespace HelloCoreClrApp.Test.WebApi.Actions
{
    public class GetLastTenGreetingsActionTest
    {
        [Fact]
        public async Task ExecuteTest()
        {
            var dataService = A.Fake<IDataService>();
            A.CallTo(() => dataService.GetLastTenGreetings(A<int>.Ignored)).Returns((new List<Greeting>()));
            var sut = new GetLastTenHelloWorldsAction(dataService);
            
            var result = await sut.Execute();
            
            result.Should().NotBeNull()
                .And.HaveCount(0);
        }

        [Fact]
        public async Task ExecuteWithTenGreetingsTest()
        {
            var greetingList = new List<Greeting>(10);
            for(var i = 1; i <= 10; i++)
                greetingList.Add(
                    new Greeting{Name = string.Format("mygreeting {0}", i), TimestampUtc = DateTime.Now.ToUniversalTime()});

            var dataService = A.Fake<IDataService>();
            A.CallTo(() => dataService.GetLastTenGreetings(10)).Returns(greetingList);
            var sut = new GetLastTenHelloWorldsAction(dataService);
            
            var result = await sut.Execute();
            
            result.Should().NotBeNull()
                .And.HaveCount(10);
        }
    }
}
