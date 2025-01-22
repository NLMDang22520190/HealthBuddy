using HealthBuddy.Server.Mapping;
using HealthBuddy.Server.Models;
using HealthBuddy.Server.Repositories;
using HealthBuddy.Server.Repositories.Implement;
using HealthBuddy.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<Auth0Settings>(builder.Configuration.GetSection("Auth0"));

// Đọc ConnectionString từ appsettings.json
//Console.WriteLine("connection string: " + builder.Configuration.GetConnectionString("HealthBuddy"));
builder.Services.AddDbContext<HealthBuddyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("HealthBuddy")));



// // Cấu hình xác thực bằng JWT
// builder.Services.AddAuthentication(options =>
// {
//     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
// }).AddJwtBearer(options =>
// {
//     options.Authority = "https://YOUR_AUTH0_DOMAIN/"; // Thay bằng domain Auth0 của bạn
//     options.Audience = "https://dev-vyacjvukxy0qkvz7.us.auth0.com/api/v2/";         // Thay bằng API Identifier đã tạo
// });

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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
