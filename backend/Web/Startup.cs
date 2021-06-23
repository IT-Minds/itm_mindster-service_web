using Application;
using Application.Common.Interfaces;
using Application.Common.Interfaces.Hubs;
using Application.Common.Options;
using AuthService;
using AuthService.Client;
using GoogleService;
using GoogleService.Client;
using FluentValidation.AspNetCore;
using Google.Apis.Auth.AspNetCore3;
using Infrastructure;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using NSwag;
using NSwag.Generation.Processors.Security;
using Serilog;
using System.Linq;
using System.Text;
using Web.DocumentProcessors;
using Web.Filters;
using Web.Hubs;
using Web.Options;
using Web.Services;

namespace Web
{
  public class Startup
  {
    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
      Configuration = configuration;
      Environment = environment;
    }

    public IConfiguration Configuration { get; }

    public IWebHostEnvironment Environment { get; }
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      services.Configure<AuthServiceOptions>(Configuration.GetSection(AuthServiceOptions.Service));
      services.Configure<GoogleServiceOptions>(Configuration.GetSection(GoogleServiceOptions.Service));
      services.Configure<TokenOptions>(Configuration.GetSection(TokenOptions.Tokens));

      services.AddCors(options =>
      {
        options.AddPolicy("Standard",
          builder =>
          {
            builder.WithOrigins("http://localhost:3000"); // TODO make into config
            builder.AllowAnyHeader();
            builder.AllowAnyMethod();
            builder.AllowCredentials();
          });
      });

      services.AddAuthService();
      services.AddGoogleService();
      services.AddApplication();
      services.AddInfrastructure(Configuration, Environment);

      services.AddHttpContextAccessor();

      services.AddHealthChecks()
          .AddDbContextCheck<ApplicationDbContext>();

      services.AddControllers(options =>
                 options.Filters.Add<ApiExceptionFilterAttribute>())
          .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<IApplicationDbContext>())
          .AddNewtonsoftJson();

      // Customise default API behaviour
      services.Configure<ApiBehaviorOptions>(options =>
      {
        options.SuppressModelStateInvalidFilter = true;
      });

      services.AddOpenApiDocument(configure =>
      {
        configure.Title = "Backend API";
        configure.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
        {
          Type = OpenApiSecuritySchemeType.ApiKey,
          Name = "Authorization",
          In = OpenApiSecurityApiKeyLocation.Header,
          Description = "Bearer {your JWT token}."
        });

        configure.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
        configure.DocumentProcessors.Add(new CustomDocumentProcessor());
      });

      var tokenOptions = Configuration.GetSection(TokenOptions.Tokens).Get<TokenOptions>();
      var googleOptions = Configuration.GetSection(GoogleAuthOptions.GoogleAuth).Get<GoogleAuthOptions>();

      services
        .AddAuthentication(o =>
        {
            o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            o.DefaultSignInScheme = GoogleOpenIdConnectDefaults.AuthenticationScheme;
        })
        .AddCookie("GoogleOpenIdConnect")
        .AddGoogle(options =>
        {
          options.ClientId = googleOptions.ClientId;
          options.ClientSecret = googleOptions.ClientSecret;
        })
        .AddJwtBearer(x =>
        {
          x.RequireHttpsMetadata = false;
          x.SaveToken = true;
          x.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(tokenOptions.Secret)),
            ValidateIssuer = false,
            ValidateAudience = false
          };
        });


      services.AddScoped<ICurrentUserService, CurrentUserService>();
      services.AddScoped<ITokenService, TokenService>();
      services.AddScoped<IAuthorizationService, AuthorizationService>();
      services.AddScoped<IExampleHubService, ExampleHubService>();
      services.AddScoped<IPendingTokenHub, PendingTokenHubService>();
      services.AddSignalR();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      app.UseCors("Standard");

      app.UseSerilogRequestLogging();
      app.UseHealthChecks("/health");
      app.UseHttpsRedirection();
      app.UseStaticFiles();
      app.UseSwaggerUi3(settings =>
      {
        settings.Path = "/swagger";
        settings.DocumentPath = "/swagger/specification.json";
      });

      app.UseRouting();

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller}/{action=Index}/{id?}");

        endpoints.MapHub<ExampleHub>("/examplehub");
        endpoints.MapHub<PendingTokenHub>("/pendingTokensHub");
      });
    }
  }
}
