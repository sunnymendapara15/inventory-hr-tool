using InventoryHrTool.Data;
using InventoryHrTool.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<InventoryStore>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
    options.AddPolicy("AllowReact", policy => policy.AllowAny().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowReact");

app.MapGet("/inventory", (InventoryStore store) => Results.Ok(store.GetAll()))
    .WithName("GetInventory")
    .WithOpenApi();

app.MapPost("/inventory", async (InventoryItem? request, InventoryStore store) =>
{
    if (request is null)
    {
        return Results.BadRequest(new { error = "Inventory payload is required." });
    }

    var name = request.Name?.Trim() ?? string.Empty;
    var quantity = request.Quantity;

    if (string.IsNullOrWhiteSpace(name))
    {
        return Results.BadRequest(new { error = "item name is required." });
    }

    if (quantity <= 0)
    {
        return Results.BadRequest(new { error = "Quantity must be greater than zero." });
    }

    if (store.ExistsByName(name))
    {
        return Results.Conflict(new { error = "An item with that name already exists." });
    }

    var newItem = new InventoryItem
    {
        Name = name,
        Quantity = quantity,
        Description = request.Description?.Trim()
    };

    store.Add(newItem);

    return Results.Created($"/inventory/{newItem.Id}", newItem);
})
    .WithName("AddInventory")
    .WithOpenApi();

app.Run();
