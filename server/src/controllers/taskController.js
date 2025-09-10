import { createTask, getTasks, updateTask, deleteTask, getTaskStats, getTasksByDate } from '../services/taskService.js';

export const createTaskController = async (req, res, next) => {
    try {
        const task = await createTask(req.body, req.user.userId);
        res.status(201).json({ message: 'Tạo task thành công', task });
    } catch (err) {
        next(err);
    }
};

export const getTasksController = async (req, res, next) => {
    try {
        const tasks = await getTasks(req.user.userId);
        res.json({ tasks });
    } catch (err) {
        next(err);
    }
};

export const updateTaskController = async (req, res, next) => {
    try {
        const task = await updateTask(req.params.id, req.body, req.user.userId);
        res.json({ message: 'Cập nhật task thành công', task });
    } catch (err) {
        next(err);
    }
};

export const deleteTaskController = async (req, res, next) => {
    try {
        await deleteTask(req.params.id, req.user.userId);
        res.json({ message: 'Xóa task thành công' });
    } catch (err) {
        next(err);
    }
};

export const getTaskStatsController = async (req, res, next) => {
    try {
        const stats = await getTaskStats(req.user.userId);
        res.json(stats);
    } catch (err) {
        next(err);
    }
};

export const getTasksByDateController = async (req, res, next) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ message: 'Thiếu tham số date' });
        }
        const tasks = await getTasksByDate(req.user.userId, date);
        res.json({ tasks });
    } catch (err) {
        next(err);
    }
};

