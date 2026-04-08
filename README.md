# Todox

Task management app built with:
- Frontend: React + Vite
- Backend: Node.js + Express + MongoDB (Mongoose)

## Prerequisites

- Node.js installed
- MongoDB running locally (or accessible via connection string)

## Setup

### 1) Backend
```bash
cd backend
npm install

# Create or update backend/.env
# Required:
#   PORT=5001
#   MONGODB_CONNECTION_STRING=mongodb://<user>:<password>@localhost:27017/todoX?authSource=admin
npm run dev
```
Backend runs on `http://localhost:${PORT}` (frontend expects `5001`).

### 2) Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

## API

Base URL (as used by the frontend): `http://localhost:5001/api`

### `GET /tasks`
Fetch tasks with optional filtering.

- Backend filter types: `today`, `week`, `month`, `all`
- Task fields: `title`, `status` (`active` | `completed`), `completedAt`

Response:
```json
{
  "tasks": [],
  "activeCount": 0,
  "completeCount": 0
}
```

Note: The backend currently reads `filter` from the **request body** (`req.body.filter`), while the frontend sends it as a **query string** (`/tasks?filter=...`). If your date filter UI doesn’t change results, adjust one side to use the same location (body vs query).

### `POST /tasks`
Create a task.

Request body:
```json
{ "title": "Buy milk" }
```

### `PUT /tasks/:id`
Update a task.

Request body:
```json
{
  "title": "New title",
  "status": "active",
  "completedAt": null
}
```

### `DELETE /tasks/:id`
Delete a task.

## Development

- Backend: `npm run dev` (nodemon)
- Frontend: `npm run dev` (Vite)
