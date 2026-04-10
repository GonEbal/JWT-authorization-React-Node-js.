# JWT Authorization — React + Node.js

A full-stack authentication app demonstrating JWT-based authorization with access and refresh tokens, email activation, and protected routes.

## Tech Stack

**Client** — React 17, TypeScript  
**Server** — Node.js, Express, MongoDB (Mongoose)

### Server dependencies

| Package | Purpose |
|---|---|
| `jsonwebtoken` | Access & refresh token signing/verification |
| `bcrypt` | Password hashing |
| `nodemailer` | Email activation links |
| `mongoose` | MongoDB ODM |
| `express-validator` | Request validation |
| `cookie-parser` | HttpOnly refresh token cookie |
| `cors` | Cross-origin support for the React client |

## Features

- User registration with email/password validation
- Email activation link sent on registration
- JWT access token (short-lived) + refresh token stored in HttpOnly cookie
- Token refresh endpoint to issue new access tokens silently
- Auth middleware protecting private routes
- User list endpoint (requires valid access token)

## Project Structure

```
├── client/          # React TypeScript frontend
│   └── src/
│       ├── components/
│       ├── http/        # Axios instance with interceptors
│       ├── models/
│       ├── services/
│       └── store/       # Auth state
└── server/          # Express backend
    ├── controllers/
    ├── dtos/
    ├── exceptions/
    ├── middlewares/
    ├── models/
    ├── router/
    └── service/
        ├── user-service.js
        ├── token-service.js
        └── mail-service.js
```

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/registration` | — | Register a new user |
| `POST` | `/api/login` | — | Login, returns access token + sets refresh cookie |
| `POST` | `/api/logout` | — | Clears refresh token cookie |
| `GET` | `/api/activate/:link` | — | Activate account via email link |
| `GET` | `/api/refresh` | Cookie | Issue new access token |
| `GET` | `/api/users` | Bearer | Get list of users |

## Getting Started

### Prerequisites

- Node.js >= 14
- MongoDB instance (local or Atlas)
- SMTP credentials for email activation

### Server

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
DB_URL=mongodb://localhost:27017/jwt-auth
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASSWORD=your_password
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
```

```bash
npm run dev
```

### Client

```bash
cd client
yarn install
yarn start
```

The app runs at `http://localhost:3000` and proxies API calls to `http://localhost:5000`.

## License

MIT

