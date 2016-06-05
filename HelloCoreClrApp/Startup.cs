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
        
        public Startup(IHostingEnvironment env)
        {
        }
        
        private readonly Container container = new Container();
        
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
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
