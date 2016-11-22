using System.Threading.Tasks;
using FluentAssertions;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.WebApi.Actions;
using Moq;
using Xunit;

namespace HelloCoreClrApp.Test.WebApi.Actions
{
    public class SayHelloWorldActionTest
    {
        [Fact]
        public async Task ExecuteAsyncTest()
        {
            var dataService = new Mock<IDataService>();
            var sut = new SayHelloWorldAction(dataService.Object);
            
            var result = await sut.ExecuteAsync("World");
            
            result.Greeting.Should().Be("Hello World!");
            dataService.Verify(s => s.SaveGreetingAsync(It.IsAny<string>()), Times.Once());
        }
        
        [Fact]
        public async Task ExecuteAsyncWithNullTest()
        {
            var dataService = new Mock<IDataService>();
            var sut = new SayHelloWorldAction(dataService.Object);
            
            var result = await sut.ExecuteAsync(null);
            
            result.Greeting.Should().Be("Are you sure?");
            dataService.Verify(s => s.SaveGreetingAsync(It.IsAny<string>()), Times.Never());
        }
        
        [Fact]
        public async Task ExecuteAsyncTestWithEmptyStringTest()
        {
            var dataService = new Mock<IDataService>();
            var sut = new SayHelloWorldAction(dataService.Object);
            
            var result = await sut.ExecuteAsync("");
            
            result.Greeting.Should().Be("Are you sure?");
            dataService.Verify(s => s.SaveGreetingAsync(It.IsAny<string>()), Times.Never());
        }
    }
}
