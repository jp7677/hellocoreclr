using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.Data.Entities;
using HelloCoreClrApp.WebApi.Actions;
using Moq;
using Xunit;

namespace HelloCoreClrApp.Test.WebApi.Actions
{
    public class GetLastTenGreetingsActionTest
    {
        [Fact]
        public async Task ExecuteAsyncTest()
        {
            var dataService = new Mock<IDataService>();
            dataService.Setup(m => m.GetLastTenGreetingsAsync(It.IsAny<int>())).ReturnsAsync(new List<Greeting>());
            var sut = new GetLastTenHelloWorldsAction(dataService.Object);
            
            var result = await sut.ExecuteAsync();
            
            result.Should().NotBeNull();
            result.GetLength(0).Should().Be(0);
        }

        [Fact]
        public async Task ExecuteAsyncWithTenGreetingsTest()
        {
            var greetingList = new List<Greeting>(10);
            for(int i = 1; i <= 10; i++)
                greetingList.Add(
                    new Greeting{Name = string.Format("mygreeting {0}", i), TimestampUtc = DateTime.Now.ToUniversalTime()});

            var dataService = new Mock<IDataService>();
            dataService.Setup(m => m.GetLastTenGreetingsAsync(10)).ReturnsAsync(greetingList);
            var sut = new GetLastTenHelloWorldsAction(dataService.Object);
            
            var result = await sut.ExecuteAsync();
            
            result.Should().NotBeNull();
            result.GetLength(0).Should().Be(10);
        }
    }
}
