using HealthBuddy.Server.Models;
using HealthBuddy.Server.Repositories;
using HealthBuddy.Server.Repositories.Implement;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


// Đọc ConnectionString từ appsettings.json
//Console.WriteLine("connection string: " + builder.Configuration.GetConnectionString("HealthBuddy"));
builder.Services.AddDbContext<HealthBuddyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("HealthBuddy")));

builder.Services.AddScoped<IUserRepository, SQLUserRepository>();


builder.Services.AddScoped(typeof(IHealthBuddyRepository<>), typeof(HealthBuddyRepository<>));

//builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

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
