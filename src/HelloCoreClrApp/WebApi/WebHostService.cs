using System;
using System.IO;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Serilog;
using SimpleInjector;

namespace HelloCoreClrApp.WebApi
{
    public class WebHostService
    {
        private readonly IConfiguration configuration;
        private readonly Container container;
        private static readonly ILogger Log = Serilog.Log.ForContext<WebHostService>();

        public WebHostService(IConfiguration configuration, Container container)
        {
            this.configuration = configuration;
            this.container = container;
        }

        public async Task Run(CancellationToken token)
        {
            await Task.Run(async () =>
            {
                Log.Information("Starting Web host.");
                await BuildWebHost().RunAsync(token);
            }, token).ContinueWith(t =>
                Log.Information("Web host {0}",t.Status.Humanize().Transform(To.LowerCase)),
                    TaskContinuationOptions.None);
        }

        private IWebHost BuildWebHost()
        {
            var startup = new Startup(container);
            var builder = new WebHostBuilder()
                .UseConfiguration(configuration)
                .UseKestrel()
                .ConfigureServices(serviceCollection => startup.ConfigureServices(serviceCollection))
                .Configure(applicationBuilder => startup.Configure(applicationBuilder));

            if (IsDevelopment())
                ConfigureWebRoot(builder); 
            
            return builder.Build();
        }

        private static bool IsDevelopment() =>
            Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
    
        private static void ConfigureWebRoot(IWebHostBuilder builder)
        {
            var webroot = FindWebRoot();
            Log.Warning("Running in Development environment, hosting static files from '{0}'.", webroot);
            builder.UseWebRoot(webroot);
        }

        private static string FindWebRoot()
        {
            var cwd = new FileInfo(Assembly.GetEntryAssembly().Location).DirectoryName;
            var webroot = Path.Combine(cwd, "..", "..", "..", "..", "..", "ui", "wwwroot");
            return Path.GetFullPath(webroot);
        }
    }
}
