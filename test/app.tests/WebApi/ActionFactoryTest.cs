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
        public void CreateGetHelloWorldActionTest()
        {
            var sayHelloWorldAction = Mock.Of<ISayHelloWorldAction>();
            var resourceProvider = Mock.Of<IResourceProvider>(r => 
                r.CreateResource<ISayHelloWorldAction>() == sayHelloWorldAction);
            var sut = new ActionFactory(resourceProvider);

            var action = sut.CreateSayHelloWorldAction();

            action.Should().NotBeNull();
        }
    }
}
