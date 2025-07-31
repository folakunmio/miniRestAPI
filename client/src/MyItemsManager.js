import React, { useEffect, useState } from 'react';
import ItemList from './ItemList';

function MyItemsManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    fetch('http://localhost:3000/items')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch items');
        return res.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) return;
    setSubmitting(true);
    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add item');
        return res.json();
      })
      .then(() => {
        setForm({ name: '', description: '' });
        fetchItems();
        setSubmitting(false);
      })
      .catch(() => setSubmitting(false));
  };

  const handleDelete = id => {
    fetch(`http://localhost:3000/items/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete item');
        fetchItems();
      })
      .catch(() => {});
  };

  const startEdit = item => {
    setEditId(item.id);
    setEditForm({ name: item.name, description: item.description });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({ name: '', description: '' });
  };

  const handleEditSubmit = e => {
    e.preventDefault();
    if (!editForm.name.trim() || !editForm.description.trim()) return;
    setSubmitting(true);
    fetch(`http://localhost:3000/items/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update item');
        return res.json();
      })
      .then(() => {
        setEditId(null);
        setEditForm({ name: '', description: '' });
        fetchItems();
        setSubmitting(false);
      })
      .catch(() => setSubmitting(false));
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h2>My Items (CRUD Demo)</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ marginRight: 8, padding: 6 }}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          style={{ marginRight: 8, padding: 6 }}
        />
        <button type="submit" disabled={submitting || !form.name.trim() || !form.description.trim()}>
          Add Item
        </button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>Error: {error}</div>
      ) : !items.length ? (
        <div>No items found.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map(item => (
            <li key={item.id} style={{ marginBottom: 16, border: '1px solid #ccc', padding: 12, borderRadius: 6 }}>
              {editId === item.id ? (
                <form onSubmit={handleEditSubmit} style={{ display: 'inline' }}>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    required
                    style={{ marginRight: 8, padding: 6 }}
                  />
                  <input
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    required
                    style={{ marginRight: 8, padding: 6 }}
                  />
                  <button type="submit" disabled={submitting || !editForm.name.trim() || !editForm.description.trim()}>
                    Save
                  </button>
                  <button type="button" onClick={cancelEdit} style={{ marginLeft: 8 }}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <strong>{item.name}</strong>: {item.description}
                  <button onClick={() => startEdit(item)} style={{ marginLeft: 12 }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} style={{ marginLeft: 8 }}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyItemsManager;