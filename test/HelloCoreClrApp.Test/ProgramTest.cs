using FluentAssertions;
using Xunit;

namespace HelloCoreClrApp.Test
{
    public class ProgramTest
    {
        [Fact]
        public void GetEnvironmentNameTest()
        {
            var environmentName = Program.GetEnvironmentName();

            environmentName.Should().NotBeNullOrEmpty();
        }

        [Fact]
        public void GetCurrentWorkingDirectoryTest()
        {
            var currentWorkingDirectory = Program.GetCurrentWorkingDirectory();

            currentWorkingDirectory.Should().NotBeNullOrEmpty();
        }
    }
}