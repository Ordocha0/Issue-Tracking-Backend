# Issue Tracker API

A RESTful backend service for tracking issues, built with **Node.js**, **Express**, **Sequelize (PostgreSQL)**, and **JWT authentication**. Users can register, log in, and manage issues — including creating, assigning, updating, searching, and deleting them.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Documentation](#documentation)
- [License](#license)

---

## Features

-  JWT-based authentication
-  User registration, login, profile, update, and delete
-  Full CRUD for issues
-  Assign issues to users
-  Search issues by title (case-insensitive, scoped to creator/assignee)
-  Filter issues by "created by me" or "assigned to me"
-  Soft deletes (paranoid mode) for users and issues
-  Structured logging with Pino
-  Password hashing with bcrypt
-  Layered architecture (Controller → Service → Repository)

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

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- npm or yarn

### Installation

```bash
git clone <repo-url>
cd issue-tracker
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
DATABASE_URL=postgres://user:password@localhost:5432/issue_tracker
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
```

### Running the Server

```bash
npm run dev     # development
npm start       # production
```

On startup the server authenticates with the database, syncs all models, and listens on the configured `PORT`.

---

## API Reference

**Base URL:** `http://localhost:3001`

Protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

### User Endpoints (`/user`)

| Method | Endpoint          | Auth | Description                       |
|--------|-------------------|------|-----------------------------------|
| POST   | `/user/register`  | No   | Register a new user               |
| POST   | `/user/login`     | No   | Login and receive a JWT           |
| GET    | `/user/profile`   | Yes  | Get the authenticated user        |
| GET    | `/user/get/:id`   | Yes  | Get a user by ID                  |
| PUT    | `/user`           | Yes  | Update the authenticated user     |
| DELETE | `/user`           | Yes  | Delete the authenticated user     |

### Issue Endpoints (`/issues`)

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

---

## Documentation

For detailed information — including full request/response schemas, data models, error handling, known issues, and the **Postman collection** — please refer to the [`Documentation/`](./Documentation) folder in this repository.

---

## License

ISC.
