using FluentAssertions;
using HelloCoreClrApp.WebApi;
using HelloCoreClrApp.WebApi.Actions;
using FakeItEasy;
using Xunit;

namespace HelloCoreClrApp.Test.WebApi
{
    public class ActionFactoryTest
    {
        [Fact]
        public void CreateSayHelloWorldActionTest()
        {
            var action = A.Fake<ISayHelloWorldAction>();
            var resourceProvider = A.Fake<IResourceProvider>();
            A.CallTo(()  => resourceProvider.CreateResource<ISayHelloWorldAction>()).Returns(action);
            var sut = new ActionFactory(resourceProvider);

            var result = sut.CreateSayHelloWorldAction();

            result.Should().NotBeNull();
        }

        [Fact]
        public void CreateGetLastTenGreetingsActionTest()
        {
            var action = A.Fake<IGetLastTenGreetingsAction>();
            var resourceProvider = A.Fake<IResourceProvider>();
            A.CallTo(()  => resourceProvider.CreateResource<IGetLastTenGreetingsAction>()).Returns(action);
            var sut = new ActionFactory(resourceProvider);

            var result = sut.CreateGetLastTenGreetingsAction();

            result.Should().NotBeNull();
        }

        [Fact]
        public void CreateGetTotalNumberOfGreetingsActionTest()
        {
            var action = A.Fake<IGetTotalNumberOfGreetingsAction>();
            var resourceProvider = A.Fake<IResourceProvider>();
            A.CallTo(()  => resourceProvider.CreateResource<IGetTotalNumberOfGreetingsAction>()).Returns(action);
            var sut = new ActionFactory(resourceProvider);

            var result = sut.CreateGetTotalNumberOfGreetingsAction();

            result.Should().NotBeNull();
        }
    }
}
