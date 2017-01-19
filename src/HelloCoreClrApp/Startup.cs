using System.Threading.Tasks;
using HelloCoreClrApp.Data;
using HelloCoreClrApp.WebApi;
using HelloCoreClrApp.WebApi.Actions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using Serilog;
using SimpleInjector;
using SimpleInjector.Integration.AspNetCore;
using SimpleInjector.Integration.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace HelloCoreClrApp
{
    public class Startup
    {
        private readonly Serilog.ILogger log = Log.ForContext<Startup>();
        private readonly Container container = new Container();
        private const string ApiVersion = "v1";
        
        public Startup(IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            log.Information("Starting up in {0} mode.", env.EnvironmentName);

            //add SeriLog to ASP.NET Core
            loggerFactory.AddSerilog();

            SetupSimpleInjector();
            SetupDatabaseAsync().Wait();
        }

        private void SetupSimpleInjector()
        {
            log.Information("Setup dependencies.");
            container.Options.DefaultScopedLifestyle = new AspNetRequestLifestyle();

            container.RegisterSingleton<IResourceProvider, ResourceProvider>();
            container.RegisterSingleton<IActionFactory, ActionFactory>();
            container.Register<ISayHelloWorldAction, SayHelloWorldAction>();
            container.Register<IGetLastTenGreetingsAction, GetLastTenHelloWorldsAction>();
            container.Register<IGetTotalNumberOfGreetingsAction, GetTotalNumberOfGreetingsAction>();

            container.RegisterSingleton<IGreetingDbContextFactory>(() =>
                new GreetingDbContextFactory(CreateDatabaseOptions().Options));
            container.Register<IDataService,DataService>();

            container.Verify();
        }

        public virtual DbContextOptionsBuilder<GreetingDbContext> CreateDatabaseOptions()
        {
            return new DbContextOptionsBuilder<GreetingDbContext>()
                .UseSqlite("Filename=./helloworld.db");
        }

        private async Task SetupDatabaseAsync()
        {
            log.Information("Setup database.");
            var dataService = container.GetInstance<IDataService>();

            await dataService.EnsureCreatedAsync();
            log.Information("Currently we have {0} saved Greetings.", await dataService.GetNumberOfGreetingsAsync());
        }

                
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            log.Information("Configuring services.");

            // Add framework services.
            services.AddMvc();
            services.AddMvcCore()
                .AddJsonFormatters(options =>
                    options.ContractResolver = new CamelCasePropertyNamesContractResolver());

            services.AddSwaggerGen(SetupSwagger);

            // Add SimpleInjector Controller Activator
            services.AddSingleton<IControllerActivator>(new SimpleInjectorControllerActivator(container));
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
            log.Information("Configuring request pipeline.");

            // Serve the default file, if present.
            app.UseDefaultFiles();
            // Add static files to the request pipeline.
            app.UseStaticFiles();

            // Add MVC to the request pipeline.
            app.UseMvc();

            app.UseSwagger();
            app.UseSwaggerUi(c => 
                c.SwaggerEndpoint("/swagger/v1/swagger.json", ApiVersion));

            app.UseSimpleInjectorAspNetRequestScoping(container);
        }
    }
}
