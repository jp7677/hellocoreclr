using Xunit;

namespace HelloWorldApp
{
    public class GetHelloWorldActionTest
    {
        
        [Fact]
        public void ExecuteTest()
        {
            var sut = new GetHelloWorldAction();
            var result = sut.Execute("World");
            Assert.Equal("Hello World!", result.Name);
        }
    }
}