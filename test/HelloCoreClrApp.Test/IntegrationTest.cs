using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FakeItEasy;
using FluentAssertions;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.Data.Entities;
using HelloCoreClrApp.WebApi;
using HelloCoreClrApp.WebApi.Messages;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SimpleInjector;
using Xunit;

namespace HelloCoreClrApp.Test
{
    public sealed class IntegrationTest : IAsyncLifetime, IDisposable
    {
        private readonly Container container = new Container();
        private TestServer server;

        public async Task InitializeAsync()
        {
            var componentRegistrar = new ComponentRegistrar(container)
            {
                DatabaseOptionsBuilder = await CreateDatabaseOptions()
            };
            componentRegistrar.RegisterApplicationComponents(A.Fake<IConfiguration>());

            var startup = new Startup(container);
            server = new TestServer(
                WebHost.CreateDefaultBuilder()
                    .ConfigureLogging(loggingBuilder => loggingBuilder.ClearProviders())
                    .ConfigureServices(serviceCollection => startup.ConfigureServices(serviceCollection))
                    .Configure(applicationBuilder => startup.Configure(applicationBuilder)));
        }

        public Task DisposeAsync()
        {
            Dispose();
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            try
            {
                container?.Dispose();
                server?.Dispose();
            }
            catch (ObjectDisposedException)
            {
                // Ignore
            }
        }

        [Fact]
        public async Task InvalidRequestReturnsNotFoundTest()
        {
            using (var client = server.CreateClient())
            {
                var response = await client.GetAsync(new Uri("/api/", UriKind.Relative));

                response.StatusCode.Should().Be(HttpStatusCode.NotFound);
            }
        }

        [Fact]
        public async Task ValidSayHelloWorldRequestReturnsOkTest()
        {
            using (var client = server.CreateClient())
            {
                var response = await client.PostAsJsonAsync(
                    "/api/sayhelloworld/",
                    "World");

                response.StatusCode.Should().Be(HttpStatusCode.OK);
                var content = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<SayHelloWorldResponse>(content);

                data.Should().NotBeNull();
                data.Greeting.Should().Be("Hello World!");
            }
        }

        [Fact]
        public async Task ValidGetTenGreetingsRequestReturnsOkTest()
        {
            using (var client = server.CreateClient())
            {
                var response = await client.GetAsync(new Uri("/api/greetings", UriKind.Relative));

                response.StatusCode.Should().Be(HttpStatusCode.OK);
                var content = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<SavedGreeting[]>(content);

                data.Should().NotBeNull()
                    .And.HaveCountGreaterThan(0);
            }
        }

        [Fact]
        public async Task ValidGetNumberOfGreetingsRequestReturnsOkTest()
        {
            using (var client = server.CreateClient())
            {
                var response = await client.GetAsync(new Uri("/api/greetings/count", UriKind.Relative));

                response.StatusCode.Should().Be(HttpStatusCode.OK);
                var content = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<int>(content);

                data.Should().BeGreaterThan(0);
            }
        }

        [Fact]
        public async Task SwaggerReturnsOkTest()
        {
            using (var client = server.CreateClient())
            {
                var response = await client.GetAsync(new Uri("/swagger/v1/swagger.json", UriKind.Relative));

                response.StatusCode.Should().Be(HttpStatusCode.OK);
            }
        }

        [Fact]
        public async Task SwaggerUiReturnsOkTest()
        {
            using (var client = server.CreateClient())
            {
                var response = await client.GetAsync(new Uri("/swagger/index.html", UriKind.Relative));

                response.StatusCode.Should().Be(HttpStatusCode.OK);
            }
        }

        private static async Task<DbContextOptionsBuilder<GreetingDbContext>> CreateDatabaseOptions()
        {
            var builder = new DbContextOptionsBuilder<GreetingDbContext>()
                .UseInMemoryDatabase("E2ETest");

            await SeedDatabase(builder.Options);

            return builder;
        }

        private static async Task SeedDatabase(DbContextOptions options)
        {
            using (var db = new GreetingDbContext(options))
            {
                await db.Greetings.AddAsync(new Greeting { Name = "First Greeting", TimestampUtc = DateTime.Now.ToUniversalTime() });
                await db.Greetings.AddAsync(new Greeting { Name = "Second Greeting", TimestampUtc = DateTime.Now.ToUniversalTime() });
                await db.SaveChangesAsync();
            }
        }
    }
}