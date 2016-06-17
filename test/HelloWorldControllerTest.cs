using System.Threading.Tasks;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Xunit;
using Moq;
using FluentAssertions;

namespace HelloWorldApp
{
    public class HelloWorldControllerTest
    {
        [Fact]
        public async Task GetHelloWorldTest(){ 
            var getHelloWorldAction = new Mock<IGetHelloWorldAction>();
            getHelloWorldAction.Setup(a =>
                a.ExecuteAsync("You")).Returns(
                    Task.FromResult<GetHelloWorldResponse>(new GetHelloWorldResponse{ Name = "Hello You!" }));
            var actionFactory = Mock.Of<IActionFactory>(f =>
                f.CreateGetHelloWorldAction() == getHelloWorldAction.Object);
            
            var sut = new HelloWorldController(actionFactory);
            var response = await sut.GetHelloWorldAsync("You");

            response.Should().NotBeNull();
            var okResponse = response.As<OkObjectResult>();
            okResponse.Should().NotBeNull();
            okResponse.StatusCode.Should().Be((int)HttpStatusCode.OK);
            var content = okResponse.Value.As<GetHelloWorldResponse>();
            content.Should().NotBeNull();
            content.Name.Should().Be("Hello You!");
        }
    }
}