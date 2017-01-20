using HelloCoreClrApp.Health;
using Xunit;

namespace HelloCoreClrApp.Test.Health
{
    public class CpuMonitorTest
    {
        [Fact]
        public void ShouldLogSomethingTest()
        {
            var sut = new CpuMonitor();

            sut.LogUsage();
        }
    }
}
