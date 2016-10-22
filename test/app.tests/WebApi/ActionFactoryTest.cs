using Xunit;
using Moq;
using FluentAssertions;
using HelloWorldApp.WebApi.Actions;
using HelloWorldApp.WebApi;

namespace HelloWorldApp.Test.WebApi
{
    public class ActionFactoryTest
    {
        [Fact]
        public void CreateSayHelloWorldActionTest()
        {
            var sayHelloWorldAction = Mock.Of<ISayHelloWorldAction>();
            var resourceProvider = Mock.Of<IResourceProvider>(r => 
                r.CreateResource<ISayHelloWorldAction>() == sayHelloWorldAction);
            var sut = new ActionFactory(resourceProvider);

            var action = sut.CreateSayHelloWorldAction();

            action.Should().NotBeNull();
        }

        [Fact]
        public void CreateGetLastTenGreetingsActionTest()
        {
            var getLastTenGreetingsAction = Mock.Of<IGetLastTenGreetingsAction>();
            var resourceProvider = Mock.Of<IResourceProvider>(r => 
                r.CreateResource<IGetLastTenGreetingsAction>() == getLastTenGreetingsAction);
            var sut = new ActionFactory(resourceProvider);

            var action = sut.CreateGetLastTenGreetingsAction();

            action.Should().NotBeNull();
        }
    }
}
