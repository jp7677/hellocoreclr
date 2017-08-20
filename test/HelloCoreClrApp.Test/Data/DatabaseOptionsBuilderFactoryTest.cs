using System;
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

            Assert.IsType<DbContextOptionsBuilder<GreetingDbContext>>(builder);
            Assert.True(builder.IsConfigured);
        }
        
        [Fact]
        public void MariaDbConnectionstringShouldReturnConfguredBuilderTest()
        {
            var builder = DatabaseOptionsBuilderFactory
                .CreateDatabaseOptionsBuilder("Server=someserver;database=helloworld");

            Assert.IsType<DbContextOptionsBuilder<GreetingDbContext>>(builder);
            Assert.True(builder.IsConfigured);
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