using FluentAssertions;
using Xunit;
using Moq;
using System.Threading.Tasks;

namespace HelloWorldApp
{
    public class GetHelloWorldActionTest
    {
        [Fact]
        public async Task ExecuteAsyncTest()
        {
            var dataService = Mock.Of<IHelloWorldDataService>();
            var sut = new GetHelloWorldAction(dataService);
            
            var result = await sut.ExecuteAsync("World");
            
            result.Name.Should().Be("Hello World!");
        }
        
        [Fact]
        public async Task ExecuteAsyncWithNullTest()
        {
            var dataService = Mock.Of<IHelloWorldDataService>();
            var sut = new GetHelloWorldAction(dataService);
            
            var result = await sut.ExecuteAsync(null);
            
            result.Name.Should().Be("Are you sure?");
        }
        
        [Fact]
        public async Task ExecuteAsyncTestWithEmptyStringTest()
        {
            var dataService = Mock.Of<IHelloWorldDataService>();
            var sut = new GetHelloWorldAction(dataService);
            
            var result = await sut.ExecuteAsync("");
            
            result.Name.Should().Be("Are you sure?");
        }
    }
}
