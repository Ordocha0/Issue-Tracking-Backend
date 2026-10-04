# Issue Tracker API Documentation

## Overview

The Issue Tracker API is a RESTful backend service built with **Node.js**, **Express**, and **Sequelize (PostgreSQL)**. It provides user authentication via JWT, and allows authenticated users to create, assign, update, and track issues.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Architecture](#architecture)
6. [Data Models](#data-models)
7. [API Endpoints](#api-endpoints)
   - [User Routes](#user-routes)
   - [Issue Routes](#issue-routes)
8. [Authentication](#authentication)
9. [Error Handling](#error-handling)
10. [Logging](#logging)
11. [Known Issues / TODO](#known-issues--todo)

---

## Tech Stack

| Layer            | Technology                          |
|------------------|-------------------------------------|
| Runtime          | Node.js                             |
| Framework        | Express.js                          |
| Database         | PostgreSQL (via Sequelize ORM)      |
| Auth             | JWT (`jsonwebtoken`)                |
| Password Hashing | bcrypt                              |
| Logging          | pino / pino-http / pino-pretty      |
| Env Management   | dotenv                              |
| CORS             | cors                                |

---

## Project Structure

```
.
├── Controllers/
│   ├── User.controller.js
│   └── Issues.controller.js
├── Services/
│   ├── User.service.js
│   └── Issues.service.js
├── Repositories/
│   ├── User.repository.js
│   └── Issues.repository.js
├── Models/
│   ├── User.js
│   ├── Issues.js
│   └── index.js
├── Routes/
│   ├── User.route.js
│   └── Issues.route.js
├── Middleware/
│   └── jwt_token_verification.js
├── Utils/
│   ├── bcrypt.js
│   ├── jwt.js
│   ├── logger.js
│   └── db.js
└── server.js
```

The codebase follows a **Controller → Service → Repository** layered architecture:

- **Controller** — Handles HTTP request/response, calls services.
- **Service** — Business logic, validation, orchestration.
- **Repository** — Direct database access via Sequelize models.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd issue-tracker

# Install dependencies
npm install

# Set up environment variables (see below)
cp .env.example .env

# Run the server (dev)
npm run dev
```

The server starts on `PORT` (default **3001**). On startup it:
1. Authenticates with the database (`sequelize.authenticate()`).
2. Syncs all models (`sequelize.sync({ alter: true })`).

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
DATABASE_URL=postgres://user:password@localhost:5432/issue_tracker
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
```

| Variable         | Description                              |
|------------------|------------------------------------------|
| `PORT`           | Port the server listens on               |
| `DATABASE_URL`   | PostgreSQL connection string             |
| `JWT_SECRET`     | Secret used to sign/verify JWT tokens    |
| `JWT_EXPIRES_IN` | Token expiry (e.g., `1d`, `7d`)          |

---

## Architecture

```
Client → Route → Middleware (JWT) → Controller → Service → Repository → Sequelize → PostgreSQL
```

- **Middleware (`verifyToken`)** — Verifies the `Authorization: Bearer <token>` header, decodes the JWT, and attaches the payload to `req.user`.
- **Controllers** — Wrap service calls in try/catch, log via `req.log`, and return appropriate HTTP status codes.
- **Services** — Validate inputs, check resource existence, hash passwords, and call repositories.
- **Repositories** — Perform raw Sequelize queries and return plain JS objects.

---

## Data Models

### User (`users`)

| Field        | Type                                 | Notes                          |
|--------------|--------------------------------------|--------------------------------|
| `id`         | UUID                                 | Primary key, auto-generated    |
| `email`      | STRING                               | Unique, validated as email     |
| `first_name` | STRING                               |                                |
| `last_name`  | STRING                               |                                |
| `phone`      | STRING                               |                                |
| `password`   | STRING                               | Excluded by default scope      |
| `role`       | ENUM(`admin`, `user`)                |                                |
| `created_at` | DATE                                 | Auto-set                       |
| `updated_at` | DATE                                 | Auto-set                       |
| `deleted_at` | DATE                                 | Soft-delete (paranoid)         |

**Scopes:**
- `defaultScope`: excludes `password`
- `withPassword`: includes `password`

### Issue (`issues`)

| Field         | Type                                            | Notes                          |
|---------------|-------------------------------------------------|--------------------------------|
| `id`          | UUID                                            | Primary key, auto-generated    |
| `title`       | STRING                                          |                                |
| `description` | TEXT                                            |                                |
| `status`      | ENUM(`open`, `in progress`, `resolved`, `closed`) | Default: `open`              |
| `priority`    | ENUM(`low`, `medium`, `high`)                   |                                |
| `created_by`  | UUID                                            | FK → users.id                  |
| `assigned_to` | UUID                                            | FK → users.id                  |
| `created_at`  | DATE                                            |                                |
| `updated_at`  | DATE                                            |                                |
| `deleted_at`  | DATE                                            | Soft-delete (paranoid)         |

**Indexes:** Unique composite index on `(title, created_by, assigned_to)`.

---

## API Endpoints

**Base URL:** `http://localhost:3001`

All protected routes require the header:

```
Authorization: Bearer <JWT_TOKEN>
```

### User Routes (`/user`)

| Method | Endpoint             | Auth | Description                       |
|--------|----------------------|------|-----------------------------------|
| POST   | `/user/register`     | No   | Register a new user               |
| POST   | `/user/login`        | No   | Login and receive a JWT           |
| GET    | `/user/profile`      | Yes  | Get the authenticated user        |
| GET    | `/user/get/:id`      | Yes  | Get a user by ID                  |
| PUT    | `/user`              | Yes  | Update the authenticated user     |
| DELETE | `/user`              | Yes  | Delete the authenticated user     |

#### `POST /user/register`

**Body:**
```json
{
  "email": "jane@example.com",
  "first_name": "Jane",
  "last_name": "Doe",
  "phone": "1234567890",
  "password": "secret123",
  "role": "user"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "email": "jane@example.com",
  "first_name": "Jane",
  "last_name": "Doe",
  "phone": "1234567890",
  "role": "user",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": null,
  "deleted_at": null
}
```

---

#### `POST /user/login`

**Body:**
```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "jane@example.com",
  "first_name": "Jane",
  ...
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

#### `GET /user/profile`

**Headers:** `Authorization: Bearer <token>`

**Response (200):** User object (without password).

---

#### `GET /user/get/:id`

**Response (200):** User object.

---

#### `PUT /user`

**Body:** Any updatable user fields.

**Response (200):** Updated user object.

---

#### `DELETE /user`

**Response (200):**
```json
{ "message": "User deleted successfully" }
```

---

### Issue Routes (`/issues`)

| Method | Endpoint                    | Auth | Description                               |
|--------|-----------------------------|------|-------------------------------------------|
| POST   | `/issues/create`            | Yes  | Create a new issue                        |
| GET    | `/issues/created/:userId?`  | Yes  | Get issues created by a user              |
| GET    | `/issues/assigned/:userId?` | Yes  | Get issues assigned to a user             |
| GET    | `/issues/get/:issueId`      | Yes  | Get issue by ID (creator or assignee)     |
| GET    | `/issues/title?title=...`   | Yes  | Search issue by title (creator/assignee)  |
| PUT    | `/issues/:issueId`          | Yes  | Update an issue (creator only)            |
| DELETE | `/issues/:issueId`          | Yes  | Delete an issue (creator only)            |

> `:userId` is optional. If omitted, the authenticated user's ID is used.

#### `POST /issues/create`

**Body:**
```json
{
  "title": "Bug on login page",
  "description": "Login button unresponsive on Safari",
  "status": "open",
  "priority": "high",
  "assigned_to": "user-uuid"
}
```

**Response (201):** Created issue object.

---

#### `GET /issues/created` or `/issues/created/:userId`

**Response (201):** Array of issues created by the user.

---

#### `GET /issues/assigned` or `/issues/assigned/:userId`

**Response (201):** Array of issues assigned to the user.

---

#### `GET /issues/get/:issueId`

Returns the issue if the requester is the **creator** or the **assignee**.

**Response (201):** Issue object.

---

#### `GET /issues/title?title=Bug`

Case-insensitive partial match. Limited to issues created by or assigned to the requester.

**Response (201):** Issue object.

---

#### `PUT /issues/:issueId`

Only the **creator** can update. Optional body fields: `title`, `description`, `status`, `priority`, `assigned_to`.

**Response (201):** Updated issue object.

---

#### `DELETE /issues/:issueId`

Only the **creator** can delete.

**Response (201):** Deleted issue object.

---

## Authentication

Authentication uses **JWT Bearer tokens**.

1. Call `POST /user/login` with valid credentials.
2. Use the returned `token` in subsequent requests:
   ```
   Authorization: Bearer <token>
   ```
3. The `verifyToken` middleware decodes the token and sets `req.user = { id, email, ... }`.

If the token is missing or invalid, the API responds with:

```json
{ "detail": "You are not authenticated!" }
```
or
```json
{ "detail": "Invalid authentication token" }
```

---

## Error Handling

All controllers follow the same pattern:

```js
try {
  // ...
  res.status(200).json(data);
} catch (error) {
  req.log.error({ err: error });
  res.status(error.statusCode || 500).json({ message: error.message });
}
```

- **`error.statusCode`** — Set explicitly in services for known business errors (e.g., `400` for "User not found").
- **Fallback** — `500` for unexpected server errors.

**Example error response:**
```json
{ "message": "User not found" }
```

---

## Logging

Logging uses **pino** with **pino-http** for automatic request/response logging and **pino-pretty** for human-readable output in development.

Request logs include:
- `method`, `url`
- `statusCode`
- Tamed error output (`type`, `message`)

Application logs (`req.log.info`, `req.log.error`) enrich entries with contextual fields such as `userId` or `issueId`.

---

## Known Issues / TODO

The following are known inconsistencies and TODOs in the current codebase:

### Bugs & Inconsistencies

1. **`checkDeletedUserRepository` logic is inverted**
   - `createUserService` uses `checkDeletedUserRepository` and throws "User already exists" — but the repository is named for *deleted* users. Should likely use a `getUserByEmailRepository` check.

2. **`loginUserService` error messages are wrong**
   - Throws `'User already exists'` when the user is not found, and `'Invalid password'` without a `statusCode`.

3. **`deleteUserService` error message is wrong**
   - Throws `'User already exists'` when the user is not found.

4. **`getUserByIdRepository` doesn't handle `null`**
   - Calls `user.get({ plain: true })` without checking if `user` is `null`, which will throw a `TypeError` for non-existent IDs.

5. **`getUserByEmailRepository` / `checkDeletedUserRepository`** similarly don't guard against `null`.

6. **`getIssuesByIdRepository` / `getIssuesByTitleRepository`** don't guard against `null`.

7. **`Issues.repository.js` — `Op.iLike` is PostgreSQL-specific.**
   - Not portable to MySQL/SQLite.

8. **Route param mismatch in controllers**
   - `getIssuesByIdController` reads `req.params.issueId`, but the route defines `:issueId` — OK. However `req.log.info({ issueId: req.params.id })` logs `undefined`.

9. **`updateUserService`** passes plain-text `password` (if provided) to the repository without hashing.

10. **`createUserController`** logs `req.params.id` which is undefined for a create request.

### TODO (as marked in code)

- Send welcome email on user creation.
- Send email on user update/delete.
- Send email on issue creation/update/delete.
- Send refresh token alongside JWT on login.

---

## License

ISC.

---

*Last updated: 2026*