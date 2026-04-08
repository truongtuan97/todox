import dotenv from 'dotenv';
import express from 'express';
import taskRoute from './routes/task.route.js';
import { connectDb } from './config/db.js';
import cors from 'cors';

dotenv.config();

// middlewares
const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(cors({origin: ["http://localhost:5173",]}))
app.use('/api/tasks', taskRoute);

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
