﻿using System.IO;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Serilog;
using SimpleInjector;

namespace HelloCoreClrApp.WebApi
{
    public class WebHostTask
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<Startup>();

        public static Task Run(IConfiguration configuration, Container container, CancellationToken token)
        {
            var host = BuildWebHost(configuration, container);
            return Task.Run(() =>
            {
                host.Run(token);
            }, token);
        }

        private static IWebHost BuildWebHost(IConfiguration configuration, Container container)
        {
            Startup.Container = container;
            var builder = new WebHostBuilder()
                .UseConfiguration(configuration)
                .UseKestrel()
                .UseStartup<Startup>();

#if DEBUG
            var webroot = FindWebRoot();
            Log.Warning("Running in Debug mode, hosting static files from '{0}'.", webroot);
            builder.UseWebRoot(webroot);
#endif

            return builder.Build();
        }

        private static string FindWebRoot()
        {
            var location = Assembly.GetEntryAssembly().Location;
            location = location.Substring(0, location.LastIndexOf(Path.DirectorySeparatorChar));

            var webroot = Path.Combine(location, "..", "..", "..", "..", "..", "ui", "wwwroot");
            return Path.GetFullPath(webroot);
        }
    }
}