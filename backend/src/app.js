import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";

import taskRoute from "./routes/task.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: ["http://localhost:5173"] }));
}

// public routes
app.use("/api/auth", authRoute);
// private routes
app.use("/api/tasks", taskRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

export default app;
