const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data store
let items = [
  { id: 1, name: 'Laptop', description: 'High-performance laptop for work and gaming' },
  { id: 2, name: 'Coffee Mug', description: 'Ceramic coffee mug with funny quotes' },
  { id: 3, name: 'Notebook', description: 'Spiral-bound notebook for taking notes' }
];

let nextId = 4; // Counter for generating new IDs

// Validation helper functions
const validateItem = (item) => {
  const errors = [];
  
  if (!item.name || typeof item.name !== 'string' || item.name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }
  
  if (!item.description || typeof item.description !== 'string' || item.description.trim().length === 0) {
    errors.push('Description is required and must be a non-empty string');
  }
  
  return errors;
};

const findItemById = (id) => {
  const numId = parseInt(id);
  if (isNaN(numId)) {
    return null;
  }
  return items.find(item => item.id === numId);
};

// Routes

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!',
    description: 'Welcome to the Simple REST API',
    endpoints: {
      'GET /': 'This endpoint',
      'GET /items': 'Get all items',
      'GET /items/:id': 'Get item by ID',
      'POST /items': 'Create new item',
      'PUT /items/:id': 'Update item by ID',
      'DELETE /items/:id': 'Delete item by ID'
    }
  });
});

// GET /items - Retrieve all items
app.get('/items', (req, res) => {
  try {
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to retrieve items'
    });
  }
});

// GET /items/:id - Retrieve a single item by ID
app.get('/items/:id', (req, res) => {
  try {
    const item = findItemById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found',
        message: `Item with ID ${req.params.id} does not exist`
      });
    }
    
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to retrieve item'
    });
  }
});

// POST /items - Create a new item
app.post('/items', (req, res) => {
  try {
    const validationErrors = validateItem(req.body);
    
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Invalid item data provided',
        details: validationErrors
      });
    }
    
    const newItem = {
      id: nextId++,
      name: req.body.name.trim(),
      description: req.body.description.trim()
    };
    
    items.push(newItem);
    
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: newItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to create item'
    });
  }
});

// PUT /items/:id - Update an item by ID
app.put('/items/:id', (req, res) => {
  try {
    const item = findItemById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found',
        message: `Item with ID ${req.params.id} does not exist`
      });
    }
    
    const validationErrors = validateItem(req.body);
    
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Invalid item data provided',
        details: validationErrors
      });
    }
    
    // Update the item
    item.name = req.body.name.trim();
    item.description = req.body.description.trim();
    
    res.json({
      success: true,
      message: 'Item updated successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to update item'
    });
  }
});

// DELETE /items/:id - Delete an item by ID
app.delete('/items/:id', (req, res) => {
  try {
    const itemIndex = items.findIndex(item => item.id === parseInt(req.params.id));
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Item not found',
        message: `Item with ID ${req.params.id} does not exist`
      });
    }
    
    const deletedItem = items.splice(itemIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Item deleted successfully',
      data: deletedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to delete item'
    });
  }
});

// Error handling for invalid routes (404)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `The requested route ${req.method} ${req.originalUrl} does not exist`,
    availableRoutes: [
      'GET /',
      'GET /items',
      'GET /items/:id',
      'POST /items',
      'PUT /items/:id',
      'DELETE /items/:id'
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON',
      message: 'Request body contains invalid JSON'
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: 'Something went wrong on the server'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}`);
});