using HealthBuddy.Server.Mapping;
using HealthBuddy.Server.Models;
using HealthBuddy.Server.Repositories;
using HealthBuddy.Server.Repositories.Implement;
using HealthBuddy.Server.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<Auth0Settings>(builder.Configuration.GetSection("Auth0"));

// Đọc ConnectionString từ appsettings.json
//Console.WriteLine("connection string: " + builder.Configuration.GetConnectionString("HealthBuddy"));
builder.Services.AddDbContext<HealthBuddyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("HealthBuddy")));

var auth0Settings = builder.Configuration.GetSection("Auth0").Get<Auth0Settings>();


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie()
.AddOpenIdConnect("Auth0", options =>
{
    // Auth0 domain và thông tin ứng dụng
    options.Authority = $"https://{auth0Settings.Domain}";
    options.ClientId = auth0Settings.ClientId;
    options.ClientSecret = auth0Settings.ClientSecret;

    // Flow xác thực: Authorization Code Flow
    options.ResponseType = "code";

    // URL callback sau khi login
    options.CallbackPath = new PathString("/callback");

    // Lưu token
    options.SaveTokens = true;

    // Scope để lấy thông tin người dùng
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");

    // Xử lý sự kiện đăng xuất
    options.Events = new OpenIdConnectEvents
    {
        OnRedirectToIdentityProviderForSignOut = (context) =>
        {
            var logoutUri = $"https://{auth0Settings.Domain}/v2/logout?client_id={auth0Settings.ClientId}";
            context.Response.Redirect(logoutUri);
            context.HandleResponse();
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", builder =>
    {
        builder.WithOrigins("https://localhost:3000", "https://healthbuddyyy.netlify.app") // Cho phép cả hai domain
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});



builder.Services.AddScoped<IUserRepository, SQLUserRepository>();


builder.Services.AddScoped(typeof(IHealthBuddyRepository<>), typeof(HealthBuddyRepository<>));
builder.Services.AddHttpClient();  // Đăng ký IHttpClientFactory
builder.Services.AddScoped<Auth0Service>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddMemoryCache();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigins");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
