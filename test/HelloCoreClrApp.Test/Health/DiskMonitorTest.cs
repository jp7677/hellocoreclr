using HelloCoreClrApp.Health;
using Xunit;

namespace HelloCoreClrApp.Test.Health
{
    public class DiskMonitorTest
    {
        [Fact]
        public void ShouldLogSomethingTest()
        {
            var sut = new DiskMonitor();

            sut.LogUsage();
        }
    }
}
