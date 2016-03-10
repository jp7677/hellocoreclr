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
        public void ExecuteTest2()
        {
            var sut = new GetHelloWorldAction();
            var result = sut.Execute("World1");
            Assert.Equal("Hello World1!", result.Name);
        }
        
        [Fact(Skip="No fun")]
        public void ExecuteTest3()
        {
            var sut = new GetHelloWorldAction();
            var result = sut.Execute("World3");
            Assert.Equal("Hello World3!", result.Name);
        }
        
        [Fact]
        public void ExecuteTest4()
        {
            var sut = new GetHelloWorldAction();
            var result = sut.Execute("World5");
            Assert.Equal("Hello World4!", result.Name);
        }
    }
}