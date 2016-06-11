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
            var getHelloWorldAction = new Mock<IGetHelloWorldAction>();
            var resourceProvider = new Mock<IResourceProvider>();
            
            resourceProvider.Setup(m => m.CreateResource<IGetHelloWorldAction>()).Returns(getHelloWorldAction.Object);

            var sut = new ActionFactory(resourceProvider.Object);
            var action = sut.CreateGetHelloWorldAction();
            action.Should().NotBeNull();
        }
    }
}
