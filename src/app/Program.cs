using System.IO;
using System.Reflection;
using System.Runtime.Loader;
using Microsoft.AspNetCore.Hosting;
using NLog;

namespace HelloWorldApp
{
    public class Program
    {
        // Entry point for the application.
        public static void Main(string[] args)
        {
            ConfigureNLog();
            ConfigureShutdownHandler();

            var host = new WebHostBuilder()
                .UseKestrel()
                .UseWebRoot(FindWebRoot())
                .UseStartup<Startup>()
                .Build();

           host.Run();
        }
        
        private static void ConfigureNLog()
        {
            var location = System.Reflection.Assembly.GetEntryAssembly().Location;
            location = location.Substring(0, location.LastIndexOf(Path.DirectorySeparatorChar));
            location = location + Path.DirectorySeparatorChar + "nlog.config";
            LogManager.Configuration = new NLog.Config.XmlLoggingConfiguration(location, true);
        }

        private static void ConfigureShutdownHandler()
        {
            var loadContext = AssemblyLoadContext.GetLoadContext(Assembly.GetEntryAssembly());
            loadContext.Unloading += ctx => 
            {
                var logger = LogManager.GetCurrentClassLogger();
                logger.Info("Shutting down.");
            };
        }
        
        private static string FindWebRoot()
        {
            var currentDir = Directory.GetCurrentDirectory();
            
            var webRoot = currentDir + Path.DirectorySeparatorChar + 
                            ".." + Path.DirectorySeparatorChar + 
                            "wwwroot";
                            
            if (!Directory.Exists(webRoot))
                webRoot = currentDir + Path.DirectorySeparatorChar + 
                            "ui" + Path.DirectorySeparatorChar + 
                            "wwwroot";

            if (!Directory.Exists(webRoot))
                webRoot = currentDir + Path.DirectorySeparatorChar + 
                            ".." + Path.DirectorySeparatorChar +
                            ".." + Path.DirectorySeparatorChar +
                            "ui" + Path.DirectorySeparatorChar + 
                            "wwwroot";  

            if (!Directory.Exists(webRoot))
                webRoot = currentDir + Path.DirectorySeparatorChar + 
                            "wwwroot";
            
            return webRoot;          
        }
    }
}
