using System.Threading.Tasks;
using Xunit;
using Moq;
using FluentAssertions;

namespace HelloWorldApp.Test
{
    public class GetHelloWorldActionTest
    {
        [Fact]
        public async Task ExecuteAsyncTest()
        {
            var dataService = new Mock<IHelloWorldDataService>();
            var sut = new GetHelloWorldAction(dataService.Object);
            
            var result = await sut.ExecuteAsync("World");
            
            result.Name.Should().Be("Hello World");
            dataService.Verify(s => s.SaveGreetingAsync(It.IsAny<string>()), Times.Once());
        }
        
        [Fact]
        public async Task ExecuteAsyncWithNullTest()
        {
            var dataService = new Mock<IHelloWorldDataService>();
            var sut = new GetHelloWorldAction(dataService.Object);
            
            var result = await sut.ExecuteAsync(null);
            
            result.Name.Should().Be("Are you sure?");
            dataService.Verify(s => s.SaveGreetingAsync(It.IsAny<string>()), Times.Never());
        }
        
        [Fact]
        public async Task ExecuteAsyncTestWithEmptyStringTest()
        {
            var dataService = new Mock<IHelloWorldDataService>();
            var sut = new GetHelloWorldAction(dataService.Object);
            
            var result = await sut.ExecuteAsync("");
            
            result.Name.Should().Be("Are you sure?");
            dataService.Verify(s => s.SaveGreetingAsync(It.IsAny<string>()), Times.Never());
        }
    }
}
