using System.Threading.Tasks;
using FluentAssertions;
using HelloCoreClrApp.Data;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace HelloCoreClrApp.Test.Data
{
    public class DataServiceTest
    {
        [Fact]
        public async Task SaveOneGreetingShouldResultInOneSavedGreetingTest()
        {
            var options = new DbContextOptionsBuilder<GreetingDbContext>()
                .UseInMemoryDatabase(nameof(SaveOneGreetingShouldResultInOneSavedGreetingTest));
            var factory = new GreetingDbContextFactory(options.Options);
            var sut = new DataService(factory);

            await sut.EnsureCreated();
            await sut.SaveGreeting("mygreeting");

            var result = await sut.GetNumberOfGreetings();

            result.Should().Be(1);
        }

        [Fact]
        public async Task SaveTenGreetingShouldResultInTenSavedGreetingTest()
        {
            var options = new DbContextOptionsBuilder<GreetingDbContext>()
                .UseInMemoryDatabase(nameof(SaveTenGreetingShouldResultInTenSavedGreetingTest));
            var factory = new GreetingDbContextFactory(options.Options);
            var sut = new DataService(factory);

            await sut.EnsureCreated();
            for (var i = 1; i <= 20; i++)
                await sut.SaveGreeting(string.Format("mygreeting {0}", 1));

            var result = await sut.GetLastTenGreetings(10);

            result.Should().NotBeNull()
                .And.HaveCount(10);
            result[0].Name.Should().Be("mygreeting 1");
        }
    }
}
