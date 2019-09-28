using System;
using FluentAssertions;
using HelloCoreClrApp.Data;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace HelloCoreClrApp.Test.Data
{
    public class DatabaseOptionsBuilderFactoryTest
    {
        [Fact]
        public void SqliteConnectionstringShouldReturnConfguredBuilderTest()
        {
            var builder = DatabaseOptionsBuilderFactory
                .CreateDatabaseOptionsBuilder("Filename=somefile.db");

            builder.Should().BeOfType<DbContextOptionsBuilder<GreetingDbContext>>();
            builder.IsConfigured.Should().BeTrue();
        }

        [Fact]
        public void MariaDbConnectionstringShouldReturnConfguredBuilderTest()
        {
            var builder = DatabaseOptionsBuilderFactory
                .CreateDatabaseOptionsBuilder("Server=someserver;database=helloworld");

            builder.Should().BeOfType<DbContextOptionsBuilder<GreetingDbContext>>();
            builder.IsConfigured.Should().BeTrue();
        }

        [Fact]
        public void InvalidConnectionstringShouldThrowTest()
        {
            Assert.Throws<NotSupportedException>(() =>
                DatabaseOptionsBuilderFactory
                    .CreateDatabaseOptionsBuilder("invalid connectionstring"));
        }
    }
}