# Express.js REST API

A simple REST API built with Express.js that provides CRUD operations for managing items. This API demonstrates fundamental concepts of RESTful services, proper error handling, and data validation.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ In-memory data storage
- ✅ Input validation and sanitization
- ✅ Comprehensive error handling
- ✅ RESTful endpoint design
- ✅ JSON response format
- ✅ Middleware implementation

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation

1. **Clone or download the project files**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   # Production mode
   npm start
   
   # Development mode (with auto-restart)
   npm run dev
   ```

4. **The server will start on http://localhost:3000**

## API Endpoints

### Base URL
```
http://localhost:3000
```

### 1. Root Endpoint
- **GET /** - Welcome message and API documentation
- **Response:** JSON object with welcome message and available endpoints

### 2. Get All Items
- **GET /items** - Retrieve all items
- **Response:** Array of all items with metadata

### 3. Get Single Item
- **GET /items/:id** - Retrieve a specific item by ID
- **Parameters:** `id` (integer) - Item ID
- **Response:** Single item object or 404 if not found

### 4. Create New Item
- **POST /items** - Create a new item
- **Request Body:**
  ```json
  {
    "name": "Item name",
    "description": "Item description"
  }
  ```
- **Response:** Created item with generated ID

### 5. Update Item
- **PUT /items/:id** - Update an existing item
- **Parameters:** `id` (integer) - Item ID
- **Request Body:**
  ```json
  {
    "name": "Updated name",
    "description": "Updated description"
  }
  ```
- **Response:** Updated item object

### 6. Delete Item
- **DELETE /items/:id** - Delete an item
- **Parameters:** `id` (integer) - Item ID
- **Response:** Deleted item object

## Data Schema

Each item has the following structure:
```json
{
  "id": 1,
  "name": "Item Name",
  "description": "Item Description"
}
```

## Example API Requests

### Using cURL

#### 1. Get all items
```bash
curl -X GET http://localhost:3000/items
```

#### 2. Get single item
```bash
curl -X GET http://localhost:3000/items/1
```

#### 3. Create new item
```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smartphone",
    "description": "Latest model smartphone with advanced features"
  }'
```

#### 4. Update item
```bash
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gaming Laptop",
    "description": "High-performance gaming laptop with RGB keyboard"
  }'
```

#### 5. Delete item
```bash
curl -X DELETE http://localhost:3000/items/1
```

### Using Postman

#### Setup
1. Open Postman
2. Create a new collection called "Express REST API"
3. Set base URL: `http://localhost:3000`

#### Example Requests

**1. GET All Items**
- Method: GET
- URL: `{{baseUrl}}/items`
- Expected Response:
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "description": "High-performance laptop for work and gaming"
    },
    {
      "id": 2,
      "name": "Coffee Mug",
      "description": "Ceramic coffee mug with funny quotes"
    },
    {
      "id": 3,
      "name": "Notebook",
      "description": "Spiral-bound notebook for taking notes"
    }
  ]
}
```

**2. GET Single Item**
- Method: GET
- URL: `{{baseUrl}}/items/1`
- Expected Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop for work and gaming"
  }
}
```

**3. POST Create Item**
- Method: POST
- URL: `{{baseUrl}}/items`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with long battery life"
}
```

**4. PUT Update Item**
- Method: PUT
- URL: `{{baseUrl}}/items/1`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "name": "Updated Laptop",
  "description": "Updated description for the laptop"
}
```

**5. DELETE Item**
- Method: DELETE
- URL: `{{baseUrl}}/items/1`
- Expected Response:
```json
{
  "success": true,
  "message": "Item deleted successfully",
  "data": {
    "id": 1,
    "name": "Updated Laptop",
    "description": "Updated description for the laptop"
  }
}
```

## Error Responses

The API returns consistent error responses with appropriate HTTP status codes:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Invalid item data provided",
  "details": [
    "Name is required and must be a non-empty string"
  ]
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Item not found",
  "message": "Item with ID 999 does not exist"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Something went wrong on the server"
}
```

## Validation Rules

- **name**: Required, must be a non-empty string
- **description**: Required, must be a non-empty string
- **id**: Auto-generated, integer values starting from 1

## Development

### Project Structure
```
├── server.js          # Main application file
├── package.json       # Project dependencies and scripts
└── README.md         # Documentation
```

### Key Features Implemented

1. **Middleware Setup**
   - `express.json()` for parsing JSON request bodies
   - `express.urlencoded()` for parsing URL-encoded data

2. **Data Management**
   - In-memory array storage
   - Auto-incrementing ID generation
   - Data persistence during server runtime

3. **Error Handling**
   - Input validation for all POST/PUT requests
   - Appropriate HTTP status codes
   - Meaningful error messages
   - Global error handler for uncaught exceptions

4. **RESTful Design**
   - Standard HTTP methods (GET, POST, PUT, DELETE)
   - Resource-based URLs
   - Consistent response format

### Testing the API

1. **Start the server:** `npm start`
2. **Visit:** http://localhost:3000 for API documentation
3. **Use tools like:**
   - Postman for GUI testing
   - cURL for command-line testing
   - Browser for GET requests

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.