using System;
using Microsoft.EntityFrameworkCore;

namespace HelloCoreClrApp.Data
{
    public static class DatabaseOptionsBuilderFactory
    {
        public static DbContextOptionsBuilder<GreetingDbContext> CreateDatabaseOptionsBuilder(string connectionString, string serverVersion = null)
        {
            if (connectionString.StartsWith("Filename", StringComparison.OrdinalIgnoreCase))
                return new DbContextOptionsBuilder<GreetingDbContext>()
                    .UseSqlite(connectionString);

            if (connectionString.StartsWith("Server", StringComparison.OrdinalIgnoreCase))
                return new DbContextOptionsBuilder<GreetingDbContext>()
                    .UseMySql(connectionString, string.IsNullOrEmpty(serverVersion) ? ServerVersion.AutoDetect(connectionString) : ServerVersion.FromString(serverVersion));

            throw new NotSupportedException($"The connection string '{connectionString}' is not supported.{Environment.NewLine}" +
                                             "Use \"Filename=[options]\" for Sqlite or \"Server=[options];\" for MariaDb. " +
                                            $"Examples {Environment.NewLine}" +
                                            $"Sqlite: \"Filename=./helloworld.db\"{Environment.NewLine}" +
                                             "MariaDb: \"Server=localhost;database=helloworld;uid=helloworld;pwd=helloworld;\"");
        }
    }
}
