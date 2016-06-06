using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.Controllers;
using Newtonsoft.Json.Serialization;
using SimpleInjector;
using SimpleInjector.Integration.AspNet;
using NLog;
using NLog.Extensions.Logging;

namespace HelloWorldApp
{
    public class Startup
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        private readonly Container container = new Container();
        
        public Startup(IHostingEnvironment env)
        {
            logger.Info("Starting up.");
        }
                
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            logger.Info("Configuring services.");
            
            services.AddCors(options =>
                options.AddPolicy("AllowFileOrigin", builder => 
                    builder.WithOrigins("file://")));
            
            // Add framework services.
            services.AddMvcCore()
                .AddJsonFormatters(options => 
                    options.ContractResolver = new CamelCasePropertyNamesContractResolver());

            // Add SimpleInjector Controller Activator
            services.AddSingleton<IControllerActivator>(new SimpleInjectorControllerActivator(container));
        }
        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // Configure is called after ConfigureServices is called.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            logger.Info("Configuring.");
            
            // Setup SimpleInjector
            container.Options.DefaultScopedLifestyle = new AspNetRequestLifestyle();
            app.UseSimpleInjectorAspNetRequestScoping(container);
            
            container.CrossWire<ILoggerFactory>(app);
            container.Register<IResourceProvider, ResourceProvider>(Lifestyle.Scoped);
            container.Register<IActionFactory, ActionFactory>(Lifestyle.Scoped);
            container.Register<IGetHelloWorldAction, GetHelloWorldAction>(Lifestyle.Scoped);
            
            container.Verify();
            
            //add NLog to ASP.NET Core
            loggerFactory.AddNLog();
            
            if (env.IsDevelopment())
                app.UseCors("AllowFileOrigin");
            
            // Serve the default file, if present.
            app.UseDefaultFiles();
            // Add static files to the request pipeline.
            app.UseStaticFiles();
            
            // Add MVC to the request pipeline.
            app.UseMvc();
        }
    }
}
