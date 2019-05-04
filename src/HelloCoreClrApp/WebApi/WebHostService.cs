using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using SimpleInjector;
using IApplicationLifetime = Microsoft.Extensions.Hosting.IApplicationLifetime;

namespace HelloCoreClrApp.WebApi
{
    public class WebHostService : BackgroundService
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<WebHostService>();
        private readonly IConfiguration configuration;
        private readonly Container container;
        private readonly IApplicationLifetime applicationLifetime;

        public WebHostService(Container container, IApplicationLifetime applicationLifetime)
        {
            this.container = container;
            this.applicationLifetime = applicationLifetime;
            configuration = container.GetInstance<IConfiguration>();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                Log.Information("Starting Web host");
                await BuildWebHost().RunAsync(stoppingToken);
                Log.Information("Web host stopped");
            }
            catch (Exception exception)
            {
                Log.Fatal(exception, "Web host failed with {exception}", exception.Message);
                applicationLifetime.StopApplication();
            }
        }

        private static bool IsDevelopment() => Program.GetEnvironmentName() == "Development";

        private static void ConfigureWebRoot(IWebHostBuilder builder)
        {
            var webRoot = FindWebRoot();
            Log.Warning("Running in Development environment, hosting static files from '{0}'.", webRoot);
            builder.UseWebRoot(webRoot);
        }

        private static string FindWebRoot()
        {
            var webRootPath = Path.Combine(Program.GetCurrentWorkingDirectory(), "..", "..", "..", "..", "..", "ui", "wwwroot");
            return Path.GetFullPath(webRootPath);
        }

        private IWebHost BuildWebHost()
        {
            var startup = new Startup(container);
            var builder = WebHost
                .CreateDefaultBuilder()
                .UseSerilog()
                .UseConfiguration(configuration)
                .UseKestrel()
                .ConfigureServices(serviceCollection => startup.ConfigureServices(serviceCollection))
                .Configure(applicationBuilder => startup.Configure(applicationBuilder));

            if (IsDevelopment())
                ConfigureWebRoot(builder);

            return builder.Build();
        }
    }
}
