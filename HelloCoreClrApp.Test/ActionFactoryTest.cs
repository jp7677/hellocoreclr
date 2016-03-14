using System;
using Xunit;

namespace HelloWorldApp
{
    public class ActionFactoryTest
    {
        [Fact]
        public void CreateGetHelloWorldActionTest()
        {
            var sut = new ActionFactory(new ResourceProviderMock());
            var action = sut.CreateGetHelloWorldAction();
            Assert.NotNull(action);
        }
        
        class ResourceProviderMock : IResourceProvider
        {
            public T CreateResource<T>() where T : class
            {
                return new GetHelloWorldActionMock() as T;
            }
        }
        
        class GetHelloWorldActionMock : IGetHelloWorldAction
        {
            public GetHelloWorldResponse Execute(string name)
            {
                throw new NotImplementedException();
            }
        }
        
    }
}
