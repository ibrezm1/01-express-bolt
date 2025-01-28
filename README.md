# User Management API

A RESTful API service that manages user operations through OAuth2 integration, featuring internal authentication and role-based access control.

## Features

- Internal user authentication with JWT
- Role-based access control (Admin/User roles)
- User management operations (create, update, unlock, deprovision)
- Password management
- User search with pagination
- OAuth2 integration for user operations
- Input validation
- Error handling
- Comprehensive logging
- Security headers
- CORS support
- Test coverage

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OAuth2 provider credentials

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Copy the environment file and update with your credentials:
```bash
cp .env.example .env
```
4. Update `.env` with your credentials:
```
PORT=3000
OAUTH2_BASE_URL=https://your-oauth2-provider.com/api
OAUTH2_API_KEY=your_oauth2_api_key
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Testing

Run tests with coverage:
```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

## Authentication

### Internal Users

The system includes two default users:

- Admin user:
  - Username: admin
  - Password: admin123
  - Role: admin

- Regular user:
  - Username: user
  - Password: user123
  - Role: user

### Login

```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "token": "jwt.token.here"
}
```

### Using Authentication

All API endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer your.jwt.token.here
```

### Role-Based Access

- Admin role required for:
  - Creating users
  - Updating users
  - Unlocking users
  - Deprovisioning users
  - Password unlock operations

- Any authenticated user can:
  - Search users

## API Endpoints

### Authentication

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### User Management

#### Create User (Admin only)
```
POST /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user"
}
```

#### Update User (Admin only)
```
PUT /api/users/:userId
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "updated@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "role": "admin"
}
```

#### Unlock User (Admin only)
```
POST /api/users/:userId/unlock
Authorization: Bearer <token>
```

#### Deprovision User (Admin only)
```
POST /api/users/:userId/deprovision
Authorization: Bearer <token>
```

#### Password Unlock (Admin only)
```
POST /api/users/:userId/password-unlock
Authorization: Bearer <token>
```

#### Search Users (Any authenticated user)
```
GET /api/users?page=1&limit=10&search=john
Authorization: Bearer <token>
```

## Error Handling

The API uses standardized error responses:

```json
{
  "error": "Error message"
}
```

Common error codes:
- 400: Bad Request (validation errors)
- 401: Unauthorized (missing or invalid token)
- 403: Forbidden (insufficient permissions)
- 500: Internal Server Error

For validation errors:
```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## Logging

Logs are stored in:
- `error.log`: Error-level logs
- `combined.log`: All logs

Console logging is also enabled in development.

## Security

- JWT-based authentication
- Role-based access control
- Helmet.js for security headers
- CORS enabled
- Input validation
- Error sanitization
- OAuth2 token-based authentication for external operations
- Bcrypt password hashing for internal users

## Project Structure

```
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── data/
│   │   └── internal.json
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   └── userService.js
│   ├── utils/
│   │   ├── errors.js
│   │   └── logger.js
│   └── server.js
├── __tests__/
│   ├── controllers/
│   │   ├── authController.test.js
│   │   └── userController.test.js
│   └── middleware/
│       └── auth.test.js
├── .env.example
├── package.json
└── README.md
```

## Development

### Adding New Endpoints

1. Add route in appropriate route file
2. Create controller method
3. Implement service method if needed
4. Add validation if required
5. Add appropriate role-based access control
6. Add tests

### Error Handling

Custom errors can be thrown using the `ApiError` class:

```javascript
throw new ApiError(statusCode, message);
```

### Logging

Use the logger utility for consistent logging:

```javascript
const logger = require('../utils/logger');

logger.info('Info message');
logger.error('Error message');
```

### Authentication

To protect a new endpoint:

```javascript
router.post('/endpoint',
  authenticateToken,           // Require authentication
  requireRole('admin'),        // Optional: require specific role
  controller.method
);
```

## License

MIT