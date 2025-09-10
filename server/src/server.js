import { PORT } from './config/env.js';
import { connectDB } from './config/db.js';
import app from './app.js';
import logger from './utils/logger.js';
import cors from "cors";

const start = async () => {
    await connectDB();
    app.use(cors({
        origin: "http://localhost:5173", // cho frontend
        credentials: true, // nếu dùng cookie
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }));
    app.listen(PORT, () => {
        logger.info(`Server đang chạy tại http://localhost:${PORT}`);
    });
};

start();
