using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace HelloWorldApp
{
    public class HelloWorldDataServiceTest
    {
        [Fact]
        public async Task SaveOneGreetingShouldResultInOneSavedGreetingTest()
        {
            var options = new DbContextOptionsBuilder<HelloWorldDbContext>()
                .UseInMemoryDatabase();
            var factory = new HelloWorldDbContextFactory(options.Options);
            var sut = new HelloWorldDataService(factory);

            await sut.EnsureCreatedAsync();
            await sut.SaveGreetingAsync("mygreeting");

            sut.GetNumberOfGreetings().Should().Be(1);
        }
    }
}