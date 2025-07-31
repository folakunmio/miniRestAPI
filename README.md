# miniRestAPI

A simple REST API built with Node.js and Express.js.

## Project Overview
This project is a minimal RESTful API for managing items (with id, name, description) using an in-memory array. It demonstrates basic CRUD operations, validation, and error handling.

## Setup Steps

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node server.js
   # or, for development with auto-reload:
   npx nodemon server.js
   ```

The server runs on port 3000 by default.

## API Documentation

### Root
- **GET /**
  - Response: `Hello, World!`

### Items
- **GET /items**
  - Returns all items.
  - Response: `[{ "id": 1, "name": "Item 1", "description": "Desc" }, ...]`

- **GET /items/:id**
  - Returns item by ID.
  - 404 if not found.

- **POST /items**
  - Body: `{ "name": "Item name", "description": "Item description" }`
  - 201 Created with new item.
  - 400 if validation fails.

- **PUT /items/:id**
  - Body: `{ "name": "New name", "description": "New description" }`
  - Updates item.
  - 404 if not found, 400 if validation fails.

- **DELETE /items/:id**
  - Deletes item by ID.
  - 404 if not found.

### Validation & Error Handling
- `name` and `description` must be non-empty strings.
- 400 Bad Request for invalid input.
- 404 Not Found for missing items/routes.
- 500 Internal Server Error for unhandled errors.

## Sample Requests (HTTP)

### Create Item
```
POST http://localhost:3000/items
Content-Type: application/json

{
  "name": "Test Item",
  "description": "A sample item."
}
```

### Get All Items
```
GET http://localhost:3000/items
```

### Get Item by ID
```
GET http://localhost:3000/items/1
```

### Update Item
```
PUT http://localhost:3000/items/1
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description."
}
```

### Delete Item
```
DELETE http://localhost:3000/items/1
```

---

## Notes
- Data is not persisted; restarting the server will reset the items array.
- Use Postman, curl, or the provided .http file to test endpoints.