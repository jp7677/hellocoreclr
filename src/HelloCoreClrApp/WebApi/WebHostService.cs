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
        private static readonly ILogger Log = Serilog.Log.ForContext<WebHostService>();

        public Task Run(Container container, IConfiguration configuration, CancellationToken token)
        {
            Log.Information("Starting Web host.");
            var host = BuildWebHost(container, configuration);
            return Task.Run(() =>
            {
                host.Run(token);
            }, token).ContinueWith(t =>
                Log.Information("Web host {0}",t.Status.Humanize().Transform(To.LowerCase)),
                TaskContinuationOptions.None);
        }

        private static IWebHost BuildWebHost(Container container, IConfiguration configuration)
        {
            var startup = new Startup(container);
            var builder = new WebHostBuilder()
                .UseConfiguration(configuration)
                .UseKestrel()
                .ConfigureServices(serviceCollection => startup.ConfigureServices(serviceCollection))
                .Configure(applicationBuilder => startup.Configure(applicationBuilder));
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
