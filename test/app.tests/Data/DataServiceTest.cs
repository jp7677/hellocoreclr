using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Xunit;
using FluentAssertions;
using HelloWorldApp.Data;

namespace HelloWorldApp.Test.Data
{
    public class DataServiceTest
    {
        [Fact]
        public async Task SaveOneGreetingShouldResultInOneSavedGreetingTest()
        {
            var options = new DbContextOptionsBuilder<GreetingDbContext>()
                .UseInMemoryDatabase("SaveOneGreetingShouldResultInOneSavedGreetingTest");

            var factory = new GreetingDbContextFactory(options.Options);
            var sut = new DataService(factory);

            await sut.EnsureCreatedAsync();
            await sut.SaveGreetingAsync("mygreeting");

            var result = await sut.GetNumberOfGreetingsAsync();
            result.Should().Be(1);
        }

        [Fact]
        public async Task SaveTenGreetingShouldResultInTenSavedGreetingTest()
        {
            var options = new DbContextOptionsBuilder<GreetingDbContext>()
                .UseInMemoryDatabase("SaveTenGreetingShouldResultInTenSavedGreetingTest");

            var factory = new GreetingDbContextFactory(options.Options);
            var sut = new DataService(factory);

            await sut.EnsureCreatedAsync();
            for(var i = 1; i <= 20; i++)
                await sut.SaveGreetingAsync(string.Format("mygreeting {0}", 1));

            var result = await sut.GetLastTenGreetingsAsync(10);
            result[0].Name.Should().Be("mygreeting 1");
            result.Count.Should().Be(10);
        }
    }
}