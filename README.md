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

## Frontend tests (full flow)

This repo includes a frontend integration-style test that runs the full UI flow:
**Register → Login → Create Task → Verify task is displayed**.

### Setup

```bash
cd frontend
npm install
```

### Run tests

```bash
cd frontend
npm test
```

### What is tested

- **Register**: fill email/password and submit (calls `POST /auth/register`)
- **Login**: submit credentials (calls `POST /auth/login`), stores token in `localStorage`, navigates to `/`
- **Create Task**: add a task title (calls `POST /tasks`)
- **Get Task + UI**: refreshes task list (calls `GET /tasks?filter=today`) and asserts the task title appears in the UI

### How it’s implemented

1) **Test file**
- `frontend/src/tests/FullFlow.test.jsx`

2) **Render the real app + routing**
- The test uses `window.history.pushState(..., "/register")` then `render(<App />)` so `BrowserRouter` starts at `/register`.

3) **Mock the API layer (no backend required)**
- `@/lib/axios` is mocked to provide `get/post/put/delete` stubs.
- `POST /auth/register`, `POST /auth/login`, and `POST /tasks` return successful responses.
- `GET /tasks?filter=today` is mocked twice:
  - first call returns an empty list (initial HomePage load)
  - second call returns a list containing the created task (after clicking “Them”)
