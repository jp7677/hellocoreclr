using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using SimpleInjector;

namespace HelloCoreClrApp.WebApi
{
    public class WebHostService : BackgroundService
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<WebHostService>();
        private readonly IConfiguration configuration;
        private readonly Container container;
        private readonly IHostApplicationLifetime hostApplicationLifetime;

        public WebHostService(Container container, IHostApplicationLifetime hostApplicationLifetime)
        {
            this.container = container;
            this.hostApplicationLifetime = hostApplicationLifetime;
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
                hostApplicationLifetime.StopApplication();
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

        private IHost BuildWebHost()
        {
            var startup = new Startup(container);
            var builder = Host
                .CreateDefaultBuilder()
                .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseConfiguration(configuration);
                    webBuilder.UseKestrel();
                    webBuilder.ConfigureServices(serviceCollection => startup.ConfigureServices(serviceCollection));
                    webBuilder.Configure(applicationBuilder => startup.Configure(applicationBuilder));
                    if (IsDevelopment())
                        ConfigureWebRoot(webBuilder);
                });

            return builder.Build();
        }
    }
}
