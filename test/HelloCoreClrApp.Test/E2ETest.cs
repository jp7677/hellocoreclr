using System;
using System.Net;
using System.Threading.Tasks;
using FluentAssertions;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.Data.Entities;
using HelloCoreClrApp.WebApi;
using HelloCoreClrApp.WebApi.Messages;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SimpleInjector;
using Xunit;

namespace HelloCoreClrApp.Test
{
    public class E2ETest
    {
        private static TestServer server = null;
        private static object lockObject = new object();

        public E2ETest()
        {
            lock (lockObject)
            {
                if (server != null)
                    return;

                var container = new Container();
                var componentRegistrar = new ComponentRegistrar(container)
                {
                    DatabaseOptionsBuilder = CreateDatabaseOptions()
                };
                componentRegistrar.RegisterApplicationComponents();

                Startup.Container = container;
                server = new TestServer(new WebHostBuilder().UseStartup<Startup>());
            }
        }

        private static DbContextOptionsBuilder<GreetingDbContext> CreateDatabaseOptions()
        {
            var builder = new DbContextOptionsBuilder<GreetingDbContext>()
                .UseInMemoryDatabase("E2ETest");

            SeedDatabase(builder.Options);

            return builder;
        }

        private static void SeedDatabase(DbContextOptions options)
        {
            using (var db = new GreetingDbContext(options))
            {
                db.Greetings.Add(new Greeting{Name = "First Greeting", TimestampUtc = DateTime.Now.ToUniversalTime()});
                db.Greetings.Add(new Greeting{Name = "Second Greeting", TimestampUtc = DateTime.Now.ToUniversalTime()});
                db.SaveChanges();
            }
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