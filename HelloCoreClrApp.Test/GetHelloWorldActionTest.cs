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
        
        [Fact]
        public void ExecuteTestWithNull()
        {
            var sut = new GetHelloWorldAction();
            var result = sut.Execute(null);
            Assert.Equal("Are you sure?", result.Name);
        }
        
        [Fact]
        public void ExecuteTestWithEmptyString()
        {
            var sut = new GetHelloWorldAction();
            var result = sut.Execute("");
            Assert.Equal("Are you sure?", result.Name);
        }
    }
}
