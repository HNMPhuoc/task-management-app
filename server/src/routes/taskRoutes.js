import express from 'express';
import {
    createTaskController,
    getTasksController,
    updateTaskController,
    deleteTaskController,
    getTaskStatsController
} from '../controllers/taskController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTaskController);
router.get('/', authMiddleware, getTasksController);
router.put('/:id', authMiddleware, updateTaskController);
router.delete('/:id', authMiddleware, deleteTaskController);

router.get('/stats', authMiddleware, getTaskStatsController);

export default router;
