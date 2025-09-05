import { PORT } from './config/env.js';
import { connectDB } from './config/db.js';
import app from './app.js';
import logger from './utils/logger.js';
const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        // console.log(`Server running on http://localhost:${PORT}`);
        logger.info(`Server đang chạy tại http://localhost:${PORT}`);
    });
};

start();
