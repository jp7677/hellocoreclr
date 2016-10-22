using System.Threading.Tasks;
using Xunit;
using Moq;
using FluentAssertions;
using HelloWorldApp.Data;
using HelloWorldApp.WebApi.Actions;
using System.Collections.Generic;
using HelloWorldApp.Data.Entities;
using System;

namespace HelloWorldApp.Test.WebApi.Actions
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
            
            result.SavedGreetings.Should().NotBeNull();
            result.SavedGreetings.GetLength(0).Should().Be(0);
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
            
            result.SavedGreetings.Should().NotBeNull();
            result.SavedGreetings.GetLength(0).Should().Be(10);
        }
    }
}
