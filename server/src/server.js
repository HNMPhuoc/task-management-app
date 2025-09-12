import { PORT } from './config/env.js';
import { connectDB } from './config/db.js';
import app from './app.js';
import logger from './utils/logger.js';
import cors from "cors";

const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        logger.info(`Server đang chạy tại http://localhost:${PORT}`);
    });
};

start();
