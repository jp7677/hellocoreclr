using FluentAssertions;
using HelloCoreClrApp.WebApi;
using HelloCoreClrApp.WebApi.Actions;
using Moq;
using Xunit;

namespace HelloCoreClrApp.Test.WebApi
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
                r.CreateResource<IGetTotalNumberOfGreetingsAction>() == action);
            var sut = new ActionFactory(resourceProvider);

            var result = sut.CreateGetTotalNumberOfGreetingsAction();

            result.Should().NotBeNull();
        }
    }
}
