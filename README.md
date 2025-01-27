# User Management API

A RESTful API service that manages user operations through OAuth2 integration.

## Features

- User management operations (create, update, unlock, deprovision)
- Password management
- User search with pagination
- OAuth2 integration
- Input validation
- Error handling
- Comprehensive logging
- Security headers
- CORS support

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
4. Update `.env` with your OAuth2 provider details:
```
PORT=3000
OAUTH2_BASE_URL=https://your-oauth2-provider.com/api
OAUTH2_API_KEY=your_oauth2_api_key
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

## API Endpoints

### User Management

#### Create User
```
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user"
}
```

#### Update User
```
PUT /api/users/:userId
Content-Type: application/json

{
  "email": "updated@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "role": "admin"
}
```

#### Unlock User
```
POST /api/users/:userId/unlock
```

#### Deprovision User
```
POST /api/users/:userId/deprovision
```

#### Password Unlock
```
POST /api/users/:userId/password-unlock
```

#### Search Users
```
GET /api/users?page=1&limit=10&search=john
```

## Error Handling

The API uses standardized error responses:

```json
{
  "error": "Error message"
}
```

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

- Helmet.js for security headers
- CORS enabled
- Input validation
- Error sanitization
- OAuth2 token-based authentication

## Project Structure

```
├── src/
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── services/
│   │   └── userService.js
│   ├── utils/
│   │   ├── errors.js
│   │   └── logger.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

## Development

### Adding New Endpoints

1. Add route in `src/routes/userRoutes.js`
2. Create controller method in `src/controllers/userController.js`
3. Implement service method in `src/services/userService.js`
4. Add validation if required

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

## Testing

Run tests with:
```bash
npm test
```

## License

MIT