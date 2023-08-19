using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

var audience = builder.Configuration.GetValue<string>("FirbaseProjectId");

builder.Services.AddAuthentication(o =>
{
    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(o =>
{
    o.RefreshOnIssuerKeyNotFound = true;
    o.MetadataAddress = $"https://securetoken.google.com/{audience}/.well-known/openid-configuration";
    o.Audience = audience;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyCors",
                      builder =>
                      {
                          builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                      });
});

builder.Services.AddAuthorization();

var app = builder.Build();
app.UseCors("MyCors");
app.UseAuthentication();
app.UseAuthorization();
app.MapGet("/secret", () => Guid.NewGuid().ToString()).RequireAuthorization();
app.Run();
