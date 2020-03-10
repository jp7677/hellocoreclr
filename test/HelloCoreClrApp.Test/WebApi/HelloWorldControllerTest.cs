using System;
using System.Net;
using System.Threading.Tasks;
using FakeItEasy;
using FluentAssertions;
using HelloCoreClrApp.WebApi;
using HelloCoreClrApp.WebApi.Actions;
using HelloCoreClrApp.WebApi.Messages;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace HelloCoreClrApp.Test.WebApi
{
    public class HelloWorldControllerTest
    {
        [Fact]
        public async Task SayHelloWorldTest()
        {
            var action = A.Fake<ISayHelloWorldAction>();
            A.CallTo(() => action.Execute("You")).Returns(new SayHelloWorldResponse { Greeting = "Hello You!" });
            var resourceProvider = A.Fake<IResourceProvider>();
            A.CallTo(() => resourceProvider.CreateResource<ISayHelloWorldAction>()).Returns(action);
            var sut = new HelloWorldController(resourceProvider);

            var response = await sut.SayHelloWorld(new SayHelloWorldRequest { Name = "You" });

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
            A.CallTo(() => action.Execute()).Returns(Array.Empty<SavedGreeting>());
            var resourceProvider = A.Fake<IResourceProvider>();
            A.CallTo(() => resourceProvider.CreateResource<IGetLastTenGreetingsAction>()).Returns(action);
            var sut = new HelloWorldController(resourceProvider);

            var response = await sut.GetLastTenGreetings();

            response.Should().NotBeNull();
            var okResponse = response.As<NoContentResult>();
            okResponse.Should().NotBeNull();
        }

        [Fact]
        public async Task SomeGreetingsShouldReturnGreetingsTest()
        {
            var action = A.Fake<IGetLastTenGreetingsAction>();
            A.CallTo(() => action.Execute()).Returns(new[] { new SavedGreeting { Greeting = "mygreeting" } });
            var resourceProvider = A.Fake<IResourceProvider>();
            A.CallTo(() => resourceProvider.CreateResource<IGetLastTenGreetingsAction>()).Returns(action);
            var sut = new HelloWorldController(resourceProvider);

            var response = await sut.GetLastTenGreetings();

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
            A.CallTo(() => action.Execute()).Returns(6);
            var resourceProvider = A.Fake<IResourceProvider>();
            A.CallTo(() => resourceProvider.CreateResource<IGetTotalNumberOfGreetingsAction>()).Returns(action);
            var sut = new HelloWorldController(resourceProvider);

            var response = await sut.GetTotalNumberOfGreetings();

            var okResponse = response.As<OkObjectResult>();
            okResponse.Should().NotBeNull();
            okResponse.StatusCode.Should().Be((int)HttpStatusCode.OK);
            var content = okResponse.Value.As<int>();
            content.Should().Be(6);
        }
    }
}
