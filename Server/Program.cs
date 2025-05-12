using Dal.API;
using Bl.API;
using Dal.Services;
using Dal.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Dal;
using Bl;
using Project;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();


// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:5174") // React app origin
                     .AllowAnyHeader() // Allow all headers
                     .AllowAnyMethod(); // Allow all HTTP methods (GET, POST, etc.)
    });
});


builder.Services.AddSingleton<IBl, BLManager>();
var app = builder.Build();

// Use the CORS policy
app.UseCors("AllowReactApp");

app.MapControllers();
app.Run();