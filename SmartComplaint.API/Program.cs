using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SmartComplaint.API.Data;
using SmartComplaint.API.Helpers;
using SmartComplaint.API.Services.Implementations;
using SmartComplaint.API.Services.Interfaces;
using SmartComplaint.API.Services.Reports;
using SmartComplaint.API.Configurations;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// ==========================
// Database Configuration
// ==========================

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseMySql(connectionString,
        ServerVersion.AutoDetect(connectionString));
});


// ==========================
// JWT Authentication
// ==========================

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["Jwt:Issuer"],

        ValidAudience = builder.Configuration["Jwt:Audience"],

        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
});


// ==========================
// Dependency Injection
// ==========================

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ICitizenDashboardService, CitizenDashboardService>();

//Complaint

builder.Services.AddScoped<IComplaintService, ComplaintService>();

//OFFICER

builder.Services.AddScoped<IOfficerService, OfficerService>();

//ADMIN

builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<JwtTokenGenerator>();
builder.Services.AddScoped<IComplaintReportService, ComplaintReportService>();
builder.Services.AddScoped<IProfileService, ProfileService>();

// Complaint Number Generator
builder.Services.AddScoped<ComplaintNumberGenerator>();

//EMAIL
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddScoped<IEmailService, EmailService>();


// ==========================
// CORS
// ==========================

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


// ==========================
// Controllers
// ==========================

builder.Services.AddControllers();
builder.Services.AddAuthorization();


// ==========================
// Swagger
// ==========================

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Smart Complaint API",
        Version = "v1"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT Token"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference=new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

QuestPDF.Settings.License = QuestPDF.Infrastructure.LicenseType.Community;


// ==========================
// Build Application
// ==========================

var app = builder.Build();


// ==========================
// Middleware
// ==========================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("AllowReactApp");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();