import express from 'express';
import {
    createTaskController,
    getTasksController,
    updateTaskController,
    deleteTaskController,
    getTaskStatsController,
    getTasksByDateController,
    markTasksCompletedController,
    getTaskDatesByMonthController
} from '../controllers/taskController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
// Tạo công việc mới
router.post('/', authMiddleware, createTaskController);
// Lấy danh sách công việc
router.get('/', authMiddleware, getTasksController);
// Lấy các ngày có công việc trong tháng
router.get("/by-month", getTaskDatesByMonthController);
// Đánh dấu tất cả công việc là đã hoàn thành
router.put('/mark-completed', authMiddleware, markTasksCompletedController);
// Xóa công việc
router.delete('/:id', authMiddleware, deleteTaskController);
// Thống kê công việc
router.get('/stats', authMiddleware, getTaskStatsController);
// Lấy công việc theo ngày
router.get('/by-date', authMiddleware, getTasksByDateController);
// Cập nhật công việc
router.put('/:id', authMiddleware, updateTaskController);

export default router;