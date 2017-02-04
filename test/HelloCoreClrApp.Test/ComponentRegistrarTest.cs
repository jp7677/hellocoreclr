using System;
using HelloCoreClrApp.Data;
using Microsoft.EntityFrameworkCore;
using SimpleInjector;
using Xunit;

namespace HelloCoreClrApp.Test
{
    public class ComponentRegistrarTest
    {
        [Fact]
        public void RegisterApplicationComponentsShouldSucceedTest()
        {
            var sut = new ComponentRegistrar(new Container())
            {
                DatabaseOptionsBuilder = new DbContextOptionsBuilder<GreetingDbContext>()
                    .UseInMemoryDatabase("ComponentRegistrarTest")
            };

            sut.RegisterApplicationComponents();
        }

        [Fact]
        public void NoDatabaseOptionsBuilderShouldThrowInvalidOperationExceptionTest()
        {
            var sut = new ComponentRegistrar(new Container());

            Assert.Throws<InvalidOperationException>(() =>
                sut.RegisterApplicationComponents());
        }
    }
}