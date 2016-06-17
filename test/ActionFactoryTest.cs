using FluentAssertions;
using Moq;
using Xunit;

namespace HelloWorldApp
{
    public class ActionFactoryTest
    {
        [Fact]
        public void CreateGetHelloWorldActionTest()
        {
            var getHelloWorldAction = Mock.Of<IGetHelloWorldAction>();
            var resourceProvider = Mock.Of<IResourceProvider>(r => 
                r.CreateResource<IGetHelloWorldAction>() == getHelloWorldAction);
            var sut = new ActionFactory(resourceProvider);

            var action = sut.CreateGetHelloWorldAction();

            action.Should().NotBeNull();
        }
    }
}
