using System.Threading.Tasks;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Xunit;
using Moq;
using FluentAssertions;
using HelloWorldApp.WebApi.Actions;
using HelloWorldApp.WebApi.Messages;
using HelloWorldApp.WebApi;

namespace HelloWorldApp.Test
{
    public class HelloWorldControllerTest
    {
        [Fact]
        public async Task SayHelloWorldTest()
        { 
            var action = new Mock<ISayHelloWorldAction>();
            action.Setup(m =>
                m.ExecuteAsync("You")).ReturnsAsync(new SayHelloWorldResponse{ Greeting = "Hello You!" });
            var actionFactory = Mock.Of<IActionFactory>(m =>
                m.CreateSayHelloWorldAction() == action.Object);
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
            var action = new Mock<IGetLastTenGreetingsAction>();
            action.Setup(m =>
                m.ExecuteAsync()).ReturnsAsync(new SavedGreeting[0]);
            var actionFactory = Mock.Of<IActionFactory>(m =>
                m.CreateGetLastTenGreetingsAction() == action.Object);
            var sut = new HelloWorldController(actionFactory);

            var response = await sut.GetLastTenGreetingsAsync();

            response.Should().NotBeNull();
            var okResponse = response.As<NoContentResult>();
            okResponse.Should().NotBeNull();
        }

        [Fact]
        public async Task SomeGreetingsShouldReturnGreetingsTest()
        { 
            var action = new Mock<IGetLastTenGreetingsAction>();
            action.Setup(m =>
                m.ExecuteAsync()).ReturnsAsync(new []{new SavedGreeting{Greeting = "mygreeting"}});
            var actionFactory = Mock.Of<IActionFactory>(m =>
                m.CreateGetLastTenGreetingsAction() == action.Object);
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
            var action = new Mock<IGetTotalNumberOfGreetingsAction>();
            action.Setup(m =>
                m.ExecuteAsync()).ReturnsAsync(6);
            var actionFactory = Mock.Of<IActionFactory>(m =>
                m.CreateGetTotalNumberOfGreetingsAction() == action.Object);
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
