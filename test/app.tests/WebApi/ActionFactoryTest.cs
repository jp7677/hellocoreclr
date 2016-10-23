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
            var action = Mock.Of<ISayHelloWorldAction>();
            var resourceProvider = Mock.Of<IResourceProvider>(r => 
                r.CreateResource<ISayHelloWorldAction>() == action);
            var sut = new ActionFactory(resourceProvider);

            var result = sut.CreateSayHelloWorldAction();

            result.Should().NotBeNull();
        }

        [Fact]
        public void CreateGetLastTenGreetingsActionTest()
        {
            var action = Mock.Of<IGetLastTenGreetingsAction>();
            var resourceProvider = Mock.Of<IResourceProvider>(r => 
                r.CreateResource<IGetLastTenGreetingsAction>() == action);
            var sut = new ActionFactory(resourceProvider);

            var result = sut.CreateGetLastTenGreetingsAction();

            result.Should().NotBeNull();
        }

        [Fact]
        public void CreateGetTotalNumberOfGreetingsActionTest()
        {
            var action = Mock.Of<IGetTotalNumberOfGreetingsAction>();
            var resourceProvider = Mock.Of<IResourceProvider>(r => 
                r.CreateResource<GetTotalNumberOfGreetingsAction>() == action);
            var sut = new ActionFactory(resourceProvider);

            var result = sut.CreateGetTotalNumberOfGreetingsAction();

            result.Should().NotBeNull();
        }
    }
}
