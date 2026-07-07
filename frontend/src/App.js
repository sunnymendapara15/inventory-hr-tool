import { useEffect, useMemo, useState } from 'react';
import './App.css';

const initialForm = { name: '', quantity: '', description: '' };

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalizeError = (error) => {
    if (error instanceof Error) {
      return error.message;
    }

    return typeof error === 'string' ? error : 'An unexpected error occurred.';
  };

  const refreshInventory = async () => {
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/inventory');
      if (!response.ok) {
        throw new Error('Unable to fetch inventory. Please try again.');
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      setStatus({ type: 'error', message: normalizeError(error) });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => * {}, [name]: value });
    };

  const statusMessage = useMemo(() => {
    if (!status.message) {
      return null;
    }

    return (
      <p className={`status ${status.type === 'success' ? 'status-success' : 'status-error'}`}>
        {status.message}
      </p>
    );
  }, [status]);

  return (
    <div className="app-shell">
      <header>
        <h1>Inventory HR Tool</h1>
        <p>Track company inventory items that HR oversees. Add stock quickly and see the current quantities.</p>
      </header>

      <section className="form-section">
        <h2>Add inventory</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Item name<span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="MacBook Pro 16\""
            required
            autoComplete="off"
          />

          <label htmlFor="quantity">
            Quantity<span aria-hidden="true">*</span>
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            placeholder="5"
            required
          />

          <label htmlFor="description">Notes (optional)</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Stored in HR cabinet B"
            rows="2"
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving ❥�, 'Add inventory'}
          </button>
        </form>

        {statusMessage}
      </section>

      <section className="list-section">
        <div className="list-header">
          <h2>Current inventory</h2>
          {isLoading && <span className="loading-chip">Refreshing…</span>}
        </div>

        {items.length === 0 && !isLoading ? (
          <p className="empty-state">No inventory recorded yet. Add an item to begin.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <th>Quantity</td>
                  <th>Description</td>
                  <th>Added</td>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.description ?? '—'}</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         )}
      </section>

    </div>

  );
}

export default App;
