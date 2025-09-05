import express from 'express';
import {
    createTaskController,
    getTasksController,
    updateTaskController,
    deleteTaskController,
} from '../controllers/taskController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTaskController);
router.get('/', authMiddleware, getTasksController);
router.put('/:id', authMiddleware, updateTaskController);
router.delete('/:id', authMiddleware, deleteTaskController);

export default router;
