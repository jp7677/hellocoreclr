using System.Net;
using System.Threading.Tasks;
using FluentAssertions;
using HelloCoreClrApp.WebApi.Messages;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json;
using Xunit;

namespace HelloCoreClrApp.Test
{
    public class IntegrationTest
    {
        private readonly TestServer server;

        public IntegrationTest()
        {
            server = new TestServer(new WebHostBuilder().UseStartup<TestserverStartup>());
        }

        [Fact]
        public async Task InvalidRequestReturnsNotFoundAsyncTest()
        {
            using (var client = server.CreateClient())
            {
                var response = await client.GetAsync("/api/");

                response.StatusCode.Should().Be(HttpStatusCode.NotFound);
            }
        }

        [Fact]
        public async Task ValidSayHelloWorldRequestReturnsOkAsyncTest()
        {
            using (var client = server.CreateClient())
            {
                var response = await client.GetAsync("/api/sayhelloworld/World");

                response.StatusCode.Should().Be(HttpStatusCode.OK);
                var content = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<SayHelloWorldResponse>(content);
                data.Should().NotBeNull();
                data.Greeting.Should().Be("Hello World!");
            }
        }

        [Fact]
        public async Task ValidGetTenGreetingsRequestReturnsOkAsyncTest()
        {
            using (var client = server.CreateClient())
            {
                var response = await client.GetAsync("/api/greetings");

                response.StatusCode.Should().Be(HttpStatusCode.OK);
                var content = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<SavedGreeting[]>(content);
                data.Should().NotBeNull();
                data.GetLength(0).Should().BeGreaterThan(0);
            }
        }

        [Fact]
        public async Task ValidGetNumberOfGreetingsRequestReturnsOkAsyncTest()
        {
            using (var client = server.CreateClient())
            {
                var response = await client.GetAsync("/api/greetings/count");

                response.StatusCode.Should().Be(HttpStatusCode.OK);
                var content = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<int>(content);
                data.Should().BeGreaterThan(0);
            }
        }

        [Fact]
        public async Task SwaggerReturnsOkAsyncTest()
        {
            using (var client = server.CreateClient())
            {
                var response = await client.GetAsync("/swagger/v1/swagger.json");

                response.StatusCode.Should().Be(HttpStatusCode.OK);
            }
        }

        [Fact]
        public async Task SwaggerUiReturnsOkAsyncTest()
        {
            using (var client = server.CreateClient())
            {
                var response = await client.GetAsync("/swagger/index.html");

                response.StatusCode.Should().Be(HttpStatusCode.OK);
            }
        }
    }
}