using System;
using System.Collections.Generic;
using System.Linq;
using InventoryHrTool.Models;

namespace InventoryHrTool.Data;

public class InventoryStore
{
    private readonly List<InventoryItem> _items = new();
    private readonly object _lock = new();

    public IReadOnlyCollection<InventoryItem> GetAll()
    {
        lock (_lock)
        {
            return _items.Select(item => item with { }).ToList();
        }
    }

    public bool ExistsByName(string name)
    {
        lock (_lock)
        {
            return _items.Any(item => string.Equals(item.Name, name, StringComparison.OrdinalIgnoreCase));
        }
    }

    public void Add(InventoryItem item)
    {
        lock (_lock)
        {
            _items.Add(item);
        }
    }
}
