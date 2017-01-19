using HelloCoreClrApp.Health;
using Xunit;

namespace HelloCoreClrApp.Test.Health
{
    public class CpuMonitorTest
    {
        [Fact]
        public void RunTest()
        {
            var sut = new CpuMonitor();

            sut.LogUsage();
        }
    }
}
