using System;
using FakeItEasy;
using HelloCoreClrApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SimpleInjector;
using Xunit;

namespace HelloCoreClrApp.Test
{
    public class ComponentRegistrarTest
    {
        private readonly IConfiguration configuration = A.Fake<IConfiguration>();

        [Fact]
        public void RegisterApplicationComponentsShouldSucceedTest()
        {
            using (var container = new Container())
            {
                var sut = new ComponentRegistrar(container)
                {
                    DatabaseOptionsBuilder = new DbContextOptionsBuilder<GreetingDbContext>()
                        .UseInMemoryDatabase("ComponentRegistrarTest")
                };

                sut.RegisterApplicationComponents(configuration);
            }
        }

        [Fact]
        public void NoDatabaseOptionsBuilderShouldThrowInvalidOperationExceptionTest()
        {
            using (var container = new Container())
            {
                var sut = new ComponentRegistrar(container);

                Assert.Throws<InvalidOperationException>(() =>
                    sut.RegisterApplicationComponents(configuration));
            }
        }
    }
}