using FluentAssertions;
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
            result.Name.Should().Be("Hello World!");
        }
        
        [Fact]
        public void ExecuteTestWithNull()
        {
            var sut = new GetHelloWorldAction();
            var result = sut.Execute(null);
            result.Name.Should().Be("Are you sure?");
        }
        
        [Fact]
        public void ExecuteTestWithEmptyString()
        {
            var sut = new GetHelloWorldAction();
            var result = sut.Execute("");
            result.Name.Should().Be("Are you sure?");
        }
    }
}
