using System;

namespace InventoryHrTool.Models;

public sealed record InventoryItem
{
    public string Id { get; init; } = Guid.NewGuid().ToString();
    public string Name { get; init; } = string.Empty;
    public int Quantity { get; init; }
    public string? Description { get; init; }
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
}
