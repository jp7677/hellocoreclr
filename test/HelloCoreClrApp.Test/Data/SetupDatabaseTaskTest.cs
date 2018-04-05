using System.Threading.Tasks;
using FakeItEasy;
using HelloCoreClrApp.Data;
using Xunit;

namespace HelloCoreClrApp.Test.Data
{
    public class SetupDatabaseTaskTest
    {
        [Fact]
        public async Task ShouldRunTest()
        {
            var dataservice = A.Fake<IDataService>();
            var sut = new SetupDatabaseTask(dataservice);

            await sut.Run();
        }
    }
}