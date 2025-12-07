using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using SolarCRM.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<SolarCRM.Infrastructure.Persistence.SolarDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped(typeof(SolarCRM.Domain.Interfaces.IGenericRepository<>), typeof(SolarCRM.Infrastructure.Repositories.GenericRepository<>));
builder.Services.AddScoped<SolarCRM.Domain.Interfaces.ILeadRepository, SolarCRM.Infrastructure.Repositories.LeadRepository>();
builder.Services.AddScoped<SolarCRM.Domain.Interfaces.IQuoteRepository, SolarCRM.Infrastructure.Repositories.QuoteRepository>();
builder.Services.AddScoped<SolarCRM.Application.Interfaces.ISolarCalculatorService, SolarCRM.Application.Services.SolarCalculatorService>();
builder.Services.AddScoped<SolarCRM.Domain.Interfaces.IProjectRepository, SolarCRM.Infrastructure.Repositories.ProjectRepository>();
builder.Services.AddScoped<SolarCRM.Domain.Interfaces.IServiceOrderRepository, SolarCRM.Infrastructure.Repositories.ServiceOrderRepository>();
builder.Services.AddScoped<SolarCRM.Domain.Interfaces.IProductRepository, SolarCRM.Infrastructure.Repositories.ProductRepository>();
builder.Services.AddScoped<SolarCRM.Domain.Interfaces.ITicketRepository, SolarCRM.Infrastructure.Repositories.TicketRepository>();
builder.Services.AddScoped<SolarCRM.Domain.Interfaces.IInteractionRepository, SolarCRM.Infrastructure.Repositories.InteractionRepository>();
builder.Services.AddScoped<SolarCRM.Domain.Interfaces.IInvoiceRepository, SolarCRM.Infrastructure.Repositories.InvoiceRepository>();
builder.Services.AddScoped<SolarCRM.Domain.Interfaces.ITransactionRepository, SolarCRM.Infrastructure.Repositories.TransactionRepository>();
builder.Services.AddScoped<SolarCRM.Domain.Interfaces.ITaxConfigurationRepository, SolarCRM.Infrastructure.Repositories.TaxConfigurationRepository>();
builder.Services.AddScoped<SolarCRM.Domain.Interfaces.IPerformanceMonitoringRepository, SolarCRM.Infrastructure.Repositories.PerformanceMonitoringRepository>();
builder.Services.AddScoped<SolarCRM.Domain.Interfaces.IProjectAnalysisRepository, SolarCRM.Infrastructure.Repositories.ProjectAnalysisRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        // Tenta pegar da variável de ambiente (separada por vírgula)
        var allowedOriginsEnv = builder.Configuration["ALLOWED_ORIGINS"];
        var allowedOrigins = !string.IsNullOrEmpty(allowedOriginsEnv)
            ? allowedOriginsEnv.Split(',', StringSplitOptions.RemoveEmptyEntries)
            : builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? [];

        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddIdentity<SolarCRM.Domain.Entities.User, Microsoft.AspNetCore.Identity.IdentityRole>()
    .AddEntityFrameworkStores<SolarCRM.Infrastructure.Persistence.SolarDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "SuperSecretKey12345678901234567890"))
    };

    options.Events = new Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"Authentication failed: {context.Exception.Message}");
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {
            Console.WriteLine("Token validated successfully");
            return Task.CompletedTask;
        },
        OnChallenge = context =>
        {
            Console.WriteLine($"OnChallenge: {context.Error}, {context.ErrorDescription}");
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddScoped<SolarCRM.Infrastructure.Services.AuthService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Apply database migrations automatically
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<SolarDbContext>();
        context.Database.Migrate();
        Console.WriteLine("Database migrations applied successfully.");

        // Seed Admin User
        var userManager = services.GetRequiredService<UserManager<SolarCRM.Domain.Entities.User>>();
        var adminEmail = "admin@solarcrm.com";
        var adminUser = await userManager.FindByEmailAsync(adminEmail);

        if (adminUser == null)
        {
            var newAdmin = new SolarCRM.Domain.Entities.User
            {
                UserName = adminEmail,
                Email = adminEmail,
                FullName = "Administrador do Sistema",
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(newAdmin, "Admin@123");

            if (result.Succeeded)
            {
                Console.WriteLine("Default Admin user created successfully.");
            }
            else
            {
                Console.WriteLine($"Failed to create Admin user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }
        }
        else
        {
            // Force password reset to ensure known state
            var token = await userManager.GeneratePasswordResetTokenAsync(adminUser);
            var result = await userManager.ResetPasswordAsync(adminUser, token, "Admin@123");
            if (result.Succeeded)
            {
                Console.WriteLine("Admin password reset to Default: Admin@123");
            }
            else
            {
                Console.WriteLine("Failed to reset Admin password.");
            }
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred while migrating the database or seeding data: {ex.Message}");
    }
}

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/", () => new { Message = "SolarCRM API is running", Environment = app.Environment.EnvironmentName, Timestamp = DateTime.UtcNow });

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
