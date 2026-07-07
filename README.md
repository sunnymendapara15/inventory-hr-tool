# Inventory HR Tool

## Overview
This repository hosts a simple inventory management system tailored for HR teams. HR can an add items, track quantities, and review the inventory list without an authentication flow.

- **Backend:** Minimal ASP.NET Core API that keeps the records in memory, exposes endpoints to list and add inventory, and includes basic validation (name required, quantity > 0, uÂunique names). 
- **Frontend:** Create React App that communicates with the backend via a proxy, validates inputs, and renders existing inventory in an accessible table.
  