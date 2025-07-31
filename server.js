const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// In-memory data model
let items = [];
let idCounter = 1;

// Helper: Validate item input
function validateItemInput(name, description) {
  if (typeof name !== 'string' || name.trim() === '') return 'Name is required and must be a non-empty string.';
  if (typeof description !== 'string' || description.trim() === '') return 'Description is required and must be a non-empty string.';
  return null;
}

// GET /items - return all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET /items/:id - return item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

// POST /items - create item
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  const error = validateItemInput(name, description);
  if (error) return res.status(400).json({ message: error });
  const newItem = { id: idCounter++, name, description };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /items/:id - update item
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  const { name, description } = req.body;
  const error = validateItemInput(name, description);
  if (error) return res.status(400).json({ message: error });
  item.name = name;
  item.description = description;
  res.json(item);
});

// DELETE /items/:id - delete item
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });
  const deleted = items.splice(index, 1)[0];
  res.json(deleted);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});