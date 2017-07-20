using System;
using System.IO;
using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json.Serialization;
using Serilog;
using SimpleInjector;
using SimpleInjector.Integration.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace HelloCoreClrApp.WebApi
{
    public class Startup
    {
        private const string ApiVersion = "v1";
        private static readonly Serilog.ILogger Log = Serilog.Log.ForContext<Startup>();

        private readonly Container container;

        public Startup(Container container)
        {
            this.container = container;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Log.Information("Configuring services.");

            // Add framework services.
            services.AddMvc();
            services.AddMvcCore()
                .AddJsonFormatters(options =>
                    options.ContractResolver = new CamelCasePropertyNamesContractResolver());

            services.AddSwaggerGen(SetupSwagger);

            // Add SimpleInjector Controller Activator
            services.AddSingleton<IControllerActivator>(new SimpleInjectorControllerActivator(container));
            services.UseSimpleInjectorAspNetRequestScoping(container);
        }

        private static void SetupSwagger(SwaggerGenOptions options)
        {
            options.SwaggerDoc("v1", new Info
            {
                Title = "Hello CoreCLR Service API",
                Description = "Just a playground...",
                TermsOfService = "None",
                Version = ApiVersion
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // Configure is called after ConfigureServices is called.
        public void Configure(IApplicationBuilder app)
        {
            //add SeriLog to ASP.NET Core
            var loggerFactory = app.ApplicationServices.GetService<ILoggerFactory>();
            loggerFactory.AddSerilog();
            
            var env = app.ApplicationServices.GetService<IHostingEnvironment>();
            Log.Information("Starting up in {0} mode.", env.EnvironmentName);
            
            Log.Information("Configuring request pipeline.");
            // Serve the default file, if present.
            app.UseDefaultFiles();
            // Add static files to the request pipeline.
            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = OnPrepareResponse
            });

            // Add MVC to the request pipeline.
            app.UseMvc();

            app.UseSwagger();
            app.UseSwaggerUI(c => 
                c.SwaggerEndpoint("/swagger/v1/swagger.json", ApiVersion));
        }

        private static void OnPrepareResponse(StaticFileResponseContext context)
        {
            var file = context.File;
            var request = context.Context.Request;
            var response = context.Context.Response;

            if (file.Name.EndsWith(".gz"))
            {
                response.Headers[HeaderNames.ContentEncoding] = "gzip";
                return;
            }

            var acceptEncoding = (string)request.Headers[HeaderNames.AcceptEncoding];
            if (acceptEncoding.IndexOf("gzip", StringComparison.OrdinalIgnoreCase) == -1)
                return;

            if (!File.Exists(file.PhysicalPath + ".gz"))
                return;

            response.StatusCode = (int)HttpStatusCode.MovedPermanently;
            response.Headers[HeaderNames.Location] = request.Path.Value + ".gz";
        }
    }
}
