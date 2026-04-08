import dotenv from 'dotenv';
import express from 'express';
import taskRoute from './routes/task.route.js';
import { connectDb } from './config/db.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

// middlewares
const app = express();
const PORT = Number(process.env.PORT) || 5000;
const __dirname = path.resolve();

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
    app.use(cors({ origin: ["http://localhost:5173",] })) 
}

app.use('/api/tasks', taskRoute);

if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

const startServer = async () => {
    await connectDb();

    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
});
