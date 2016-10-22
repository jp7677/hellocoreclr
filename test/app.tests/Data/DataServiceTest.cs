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
                .UseInMemoryDatabase();
            var factory = new GreetingDbContextFactory(options.Options);
            var sut = new DataService(factory);

            await sut.EnsureCreatedAsync();
            await sut.SaveGreetingAsync("mygreeting");

            var result = await sut.GetNumberOfGreetingsAsync();
            result.Should().Be(1);
        }
    }
}