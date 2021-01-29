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
        public void SqliteConnectionStringShouldReturnConfiguredBuilderTest()
        {
            var builder = DatabaseOptionsBuilderFactory
                .CreateDatabaseOptionsBuilder("Filename=somefile.db");

            builder.Should().BeOfType<DbContextOptionsBuilder<GreetingDbContext>>();
            builder.IsConfigured.Should().BeTrue();
        }

        [Fact]
        public void MariaDbConnectionStringShouldReturnConfiguredBuilderTest()
        {
            var builder = DatabaseOptionsBuilderFactory
                .CreateDatabaseOptionsBuilder("Server=someserver;database=helloworld", "1.0");

            builder.Should().BeOfType<DbContextOptionsBuilder<GreetingDbContext>>();
            builder.IsConfigured.Should().BeTrue();
        }

        [Fact]
        public void InvalidConnectionStringShouldThrowTest()
        {
            Assert.Throws<NotSupportedException>(() =>
                DatabaseOptionsBuilderFactory
                    .CreateDatabaseOptionsBuilder("invalid connection string"));
        }
    }
}
