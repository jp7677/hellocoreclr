using System.Threading.Tasks;
using FluentAssertions;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.WebApi.Actions;
using Moq;
using Xunit;

namespace HelloCoreClrApp.Test.WebApi.Actions
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
