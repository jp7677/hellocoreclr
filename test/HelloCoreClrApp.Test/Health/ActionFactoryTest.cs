using HelloCoreClrApp.Health;
using Xunit;

namespace HelloCoreClrApp.Test.Health
{
    public class DisMonitorTest
    {
        [Fact]
        public void RunTest()
        {
            var sut = new DiskMonitor();

            sut.LogUsage();
        }
    }
}
