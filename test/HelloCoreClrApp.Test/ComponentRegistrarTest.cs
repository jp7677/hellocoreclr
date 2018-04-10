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
            var sut = new ComponentRegistrar(new Container())
            {
                DatabaseOptionsBuilder = new DbContextOptionsBuilder<GreetingDbContext>()
                    .UseInMemoryDatabase("ComponentRegistrarTest")
            };

            sut.RegisterApplicationComponents(configuration);
        }

        [Fact]
        public void NoDatabaseOptionsBuilderShouldThrowInvalidOperationExceptionTest()
        {
            var sut = new ComponentRegistrar(new Container());

            Assert.Throws<InvalidOperationException>(() =>
                sut.RegisterApplicationComponents(configuration));
        }
    }
}