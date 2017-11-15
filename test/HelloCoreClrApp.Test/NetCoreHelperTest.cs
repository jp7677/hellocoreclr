using Xunit;

namespace HelloCoreClrApp.Test
{
    public class NetCoreHelperTest
    {
        [Fact] public void GetNetCoreVersionShouldReturnVersionTest()
        {
            var version = NetCoreHelper.GetNetCoreVersion();
            Assert.NotNull(version);
        }
    }
}