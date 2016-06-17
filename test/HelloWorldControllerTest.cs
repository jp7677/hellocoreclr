using FluentAssertions;
using Xunit;
using Moq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace HelloWorldApp
{
    public class HelloWorldControllerTest
    {
        [Fact]
        public async Task GetHelloWorldTest(){ 
            var getHelloWorldAction = Mock.Of<IGetHelloWorldAction>(a =>
                a.Execute("You") == new GetHelloWorldResponse(){Name = "Hello You!"});
            var actionFactory = Mock.Of<IActionFactory>(f =>
                f.CreateGetHelloWorldAction() == getHelloWorldAction);

            var dataService = Mock.Of<IHelloWorldDataService>();
            
            var sut = new HelloWorldController(actionFactory, dataService);
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