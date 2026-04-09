import { connectDb } from './config/db.js';
import app from "./app.js";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
    await connectDb();

    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
    });
};

if (process.env.NODE_ENV !== "test") {
  startServer().catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
  });
}

export default app;
