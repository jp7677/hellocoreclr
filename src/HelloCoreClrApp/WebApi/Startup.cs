﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Serilog;
using SimpleInjector;
using SimpleInjector.Integration.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace HelloCoreClrApp.WebApi
{
    public class Startup
    {
        private const string ApiVersion = "v1";
        private static readonly ILogger Log = Serilog.Log.ForContext<Startup>();

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
            services.AddControllers()
                .SetCompatibilityVersion(CompatibilityVersion.Latest);

            services.AddSwaggerGen(SetupSwagger);

            // Add SimpleInjector Controller Activator
            services.AddSingleton<IControllerActivator>(new SimpleInjectorControllerActivator(container));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // Configure is called after ConfigureServices is called.
        public void Configure(IApplicationBuilder app)
        {
            var env = app.ApplicationServices.GetService<IWebHostEnvironment>();
            Log.Information("Starting up in {0} mode.", env.EnvironmentName);

            Log.Information("Configuring request pipeline.");

            if (env.IsDevelopment())
                UseStaticHosting(app);

            app.UseRouting();
            app.UseEndpoints(endpoints =>
                endpoints.MapControllers());

            app.UseSwagger();
            app.UseSwaggerUI(c =>
                c.SwaggerEndpoint("/swagger/v1/swagger.json", ApiVersion));
        }

        private static void SetupSwagger(SwaggerGenOptions options)
        {
            options.SwaggerDoc(
                "v1",
                new OpenApiInfo { Title = "Hello CoreCLR Service API", Description = "Just a playground...", Version = ApiVersion });
        }

        private static void UseStaticHosting(IApplicationBuilder app)
        {
            // Serve the default file, if present.
            app.UseDefaultFiles();

            // Add static files to the request pipeline.
            app.UseStaticFiles();
        }
    }
}
