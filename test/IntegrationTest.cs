using System.Net;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json;
using Xunit;

namespace HelloWorldApp
{
    public class IntegrationTest
    {
        private TestServer server;

        public IntegrationTest()
        {
            server = new TestServer(new WebHostBuilder().UseStartup<Startup>());
        }

        [Fact]
        public async void ValidRequestReturnsOkTest()
        {
            using (var client = server.CreateClient())
            {
                var response = await client.GetAsync("/api/helloworld/World");
                response.StatusCode.Should().Be(HttpStatusCode.OK);

                var content = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<GetHelloWorldResponse>(content);
                data.Should().NotBeNull();
                data.Name.Should().Be("Hello World!");
            }
        }
    }
}