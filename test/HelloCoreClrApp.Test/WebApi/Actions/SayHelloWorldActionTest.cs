using System.Threading.Tasks;
using FluentAssertions;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.WebApi.Actions;
using FakeItEasy;
using Xunit;

namespace HelloCoreClrApp.Test.WebApi.Actions
{
    public class SayHelloWorldActionTest
    {
        [Fact]
        public async Task ExecuteAsyncTest()
        {
            var dataService = A.Fake<IDataService>();
            var sut = new SayHelloWorldAction(dataService);
            
            var result = await sut.ExecuteAsync("World");
            
            result.Greeting.Should().Be("Hello World!");
            A.CallTo(() => dataService.SaveGreetingAsync(A<string>.Ignored))
                .MustHaveHappened(Repeated.Exactly.Once);
        }
        
        [Fact]
        public async Task ExecuteWithNullAsyncTest()
        {
            var dataService = A.Fake<IDataService>();
            var sut = new SayHelloWorldAction(dataService);
            
            var result = await sut.ExecuteAsync(null);
            
            result.Greeting.Should().Be("Are you sure?");
            A.CallTo(() => dataService.SaveGreetingAsync(A<string>.Ignored))
                .MustNotHaveHappened();
        }
        
        [Fact]
        public async Task ExecuteTestWithEmptyStringAsyncTest()
        {
            var dataService = A.Fake<IDataService>();
            var sut = new SayHelloWorldAction(dataService);
            
            var result = await sut.ExecuteAsync("");
            
            result.Greeting.Should().Be("Are you sure?");
            A.CallTo(() => dataService.SaveGreetingAsync(A<string>.Ignored))
                .MustNotHaveHappened();
        }
    }
}
