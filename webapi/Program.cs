using webapi;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.UseArhApiConfig();
builder.UseJwtAuthentication();
builder.swaggerhandler();


builder.Services.AddOpenApiDocument();


builder.Services.AddHttpContextAccessor();
builder.Services.AddAutoMapper(typeof(Program).Assembly);


var app = builder.Build();
if (app.Environment.IsDevelopment())
{

    app.UseDeveloperExceptionPage();
    /*    app.UseOpenApi();*/
    /*    app.UseSwaggerUi3();*/
    app.UseOpenApi();
    app.UseSwaggerUi3();
    app.UseSwaggerUI(c => {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ARH.API v1");
      
    });
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}


    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.UseHttpsRedirection();

/*app.UseStaticFiles(new StaticFileOptions()
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @".\Image")),
    RequestPath = new PathString("/Image")
});*/

app.UseRouting();

app.MapControllers();
app.UseCors("AllowAll");
app.UseDeveloperExceptionPage();
app.UseAuthentication();
app.UseAuthorization();
app.Run();
