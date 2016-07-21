using System;
using System.IO;
using System.Reflection;
using System.Runtime.Loader;
using System.Threading;
using Microsoft.AspNetCore.Hosting;
using NLog;

namespace HelloWorldApp
{
    public class Program
    {
        private static readonly CancellationTokenSource ShutdownCancellationTokenSource = new CancellationTokenSource();  

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

           host.Run(ShutdownCancellationTokenSource.Token);
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
                Cancel("SIGTERM");
            Console.CancelKeyPress += (s, e) =>
                Cancel(e.SpecialKey == ConsoleSpecialKey.ControlC ? "SIGINT" : "SIGQUIT");
        }

        private static void Cancel(string signal)
        {
            var logger = LogManager.GetCurrentClassLogger();
            logger.Info("{0} received, request shutdown...", signal);
            if (!ShutdownCancellationTokenSource.IsCancellationRequested)
                ShutdownCancellationTokenSource.Cancel();
            LogManager.Flush();
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
