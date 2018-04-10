using System.Threading.Tasks;
using FakeItEasy;
using FluentAssertions;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.WebApi.Actions;
using Xunit;

namespace HelloCoreClrApp.Test.WebApi.Actions
{
    public class SayHelloWorldActionTest
    {
        [Fact]
        public async Task ExecuteTest()
        {
            var dataService = A.Fake<IDataService>();
            var sut = new SayHelloWorldAction(dataService);

            var result = await sut.Execute("World");

            result.Greeting.Should().Be("Hello World!");
            A.CallTo(() => dataService.SaveGreeting(A<string>.Ignored))
                .MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task ExecuteWithNullTest()
        {
            var dataService = A.Fake<IDataService>();
            var sut = new SayHelloWorldAction(dataService);

            var result = await sut.Execute(null);

            result.Greeting.Should().Be("Are you sure?");
            A.CallTo(() => dataService.SaveGreeting(A<string>.Ignored))
                .MustNotHaveHappened();
        }

        [Fact]
        public async Task ExecuteTestWithEmptyStringTest()
        {
            var dataService = A.Fake<IDataService>();
            var sut = new SayHelloWorldAction(dataService);

            var result = await sut.Execute(string.Empty);

            result.Greeting.Should().Be("Are you sure?");
            A.CallTo(() => dataService.SaveGreeting(A<string>.Ignored))
                .MustNotHaveHappened();
        }
    }
}
