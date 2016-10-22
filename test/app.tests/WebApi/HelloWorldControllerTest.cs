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
        public async Task SayHelloWorldTest(){ 
            var sayHelloWorldAction = new Mock<ISayHelloWorldAction>();
            sayHelloWorldAction.Setup(a =>
                a.ExecuteAsync("You")).Returns(
                    Task.FromResult(new SayHelloWorldResponse{ Greeting = "Hello You!" }));
            var actionFactory = Mock.Of<IActionFactory>(f =>
                f.CreateSayHelloWorldAction() == sayHelloWorldAction.Object);
            
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
    }
}