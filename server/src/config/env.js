import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/task_app';
export const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
