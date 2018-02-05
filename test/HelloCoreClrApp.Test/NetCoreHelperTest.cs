using FluentAssertions;
using Xunit;

namespace HelloCoreClrApp.Test
{
    public class NetCoreHelperTest
    {
        [Fact] public void GetNetCoreVersionShouldReturnVersionTest()
        {
            var version = NetCoreHelper.GetNetCoreVersion();

            version.Should().NotBeNullOrEmpty();
        }
    }
}