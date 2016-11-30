using System.Net;
using System.Threading.Tasks;
using FluentAssertions;
using HelloCoreClrApp.WebApi;
using HelloCoreClrApp.WebApi.Actions;
using HelloCoreClrApp.WebApi.Messages;
using Microsoft.AspNetCore.Mvc;
using FakeItEasy;
using Xunit;

namespace HelloCoreClrApp.Test.WebApi
{
    public class HelloWorldControllerTest
    {
        [Fact]
        public async Task SayHelloWorldTest()
        { 
            var action = A.Fake<ISayHelloWorldAction>();
            A.CallTo(() => action.ExecuteAsync("You")).Returns(new SayHelloWorldResponse{ Greeting = "Hello You!" });
            var actionFactory = A.Fake<IActionFactory>();
            A.CallTo(() => actionFactory.CreateSayHelloWorldAction()).Returns(action);
            var sut = new HelloWorldController(actionFactory);

            var response = await sut.SayHelloWorldAsync("You");

            response.Should().NotBeNull();
            var okResponse = response.As<OkObjectResult>();
            okResponse.Should().NotBeNull();
            okResponse.StatusCode.Should().Be((int)HttpStatusCode.OK);
            var content = okResponse.Value.As<SayHelloWorldResponse>();
            content.Should().NotBeNull();
            content.Greeting.Should().Be("Hello You!");
        }

        [Fact]
        public async Task NoGreetingsShouldReturnNoContentTest()
        { 
            var action = A.Fake<IGetLastTenGreetingsAction>();
            A.CallTo(() => action.ExecuteAsync()).Returns(new SavedGreeting[0]);
            var actionFactory = A.Fake<IActionFactory>();
            A.CallTo(() => actionFactory.CreateGetLastTenGreetingsAction()).Returns(action);
            var sut = new HelloWorldController(actionFactory);

            var response = await sut.GetLastTenGreetingsAsync();

            response.Should().NotBeNull();
            var okResponse = response.As<NoContentResult>();
            okResponse.Should().NotBeNull();
        }

        [Fact]
        public async Task SomeGreetingsShouldReturnGreetingsTest()
        { 
            var action = A.Fake<IGetLastTenGreetingsAction>();
            A.CallTo(() => action.ExecuteAsync()).Returns(new []{new SavedGreeting{Greeting = "mygreeting"}});
            var actionFactory = A.Fake<IActionFactory>();
            A.CallTo(() => actionFactory.CreateGetLastTenGreetingsAction()).Returns(action);
            var sut = new HelloWorldController(actionFactory);

            var response = await sut.GetLastTenGreetingsAsync();

            var okResponse = response.As<OkObjectResult>();
            okResponse.Should().NotBeNull();
            okResponse.StatusCode.Should().Be((int)HttpStatusCode.OK);
            var content = okResponse.Value.As<SavedGreeting[]>();
            content.Should().NotBeNull();
            content[0].Greeting.Should().Be("mygreeting");
        }

        [Fact]
        public async Task GetNumberOfGreetingsShouldReturnSomeNumberTest()
        { 
            var action = A.Fake<IGetTotalNumberOfGreetingsAction>();
            A.CallTo(() => action.ExecuteAsync()).Returns(6);
            var actionFactory = A.Fake<IActionFactory>();
            A.CallTo(() => actionFactory.CreateGetTotalNumberOfGreetingsAction()).Returns(action);
            var sut = new HelloWorldController(actionFactory);

            var response = await sut.GetTotalNumberOfGreetingsAsync();

            var okResponse = response.As<OkObjectResult>();
            okResponse.Should().NotBeNull();
            okResponse.StatusCode.Should().Be((int)HttpStatusCode.OK);
            var content = okResponse.Value.As<int>();
            content.Should().Be(6);
        }
    }
}
