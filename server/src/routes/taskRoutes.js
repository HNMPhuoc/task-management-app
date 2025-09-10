import express from 'express';
import {
    createTaskController,
    getTasksController,
    updateTaskController,
    deleteTaskController,
    getTaskStatsController,
    getTasksByDateController
} from '../controllers/taskController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTaskController);
router.get('/', authMiddleware, getTasksController);
router.put('/:id', authMiddleware, updateTaskController);
router.delete('/:id', authMiddleware, deleteTaskController);

router.get('/stats', authMiddleware, getTaskStatsController);

router.get('/by-date', authMiddleware, getTasksByDateController);

export default router;