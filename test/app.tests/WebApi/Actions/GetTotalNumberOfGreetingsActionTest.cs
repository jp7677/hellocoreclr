using System.Threading.Tasks;
using Xunit;
using Moq;
using FluentAssertions;
using HelloWorldApp.Data;
using HelloWorldApp.WebApi.Actions;

namespace HelloWorldApp.Test.WebApi.Actions
{
    public class GetTotalNumberOfGreetingsActionTest
    {
        [Fact]
        public async Task ExecuteAsyncTest()
        {
            var dataService = new Mock<IDataService>();
            dataService.Setup(m => m.GetNumberOfGreetingsAsync()).ReturnsAsync(6);

            var sut = new GetTotalNumberOfGreetingsAction(dataService.Object);
            
            var result = await sut.ExecuteAsync();
            
            result.Should().Be(6);
        }
    }
}
