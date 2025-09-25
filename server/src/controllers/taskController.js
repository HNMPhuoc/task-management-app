import { createTask, getTasks, updateTask, deleteTask, getTaskStats, getTasksByDate, markTasksCompleted, getTaskDatesByMonth, createTasksRange, getYearlyCompletion, getYearlyStatsByTitle } from '../services/taskService.js';

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

export const markTasksCompletedController = async (req, res, next) => {
    try {
        const { taskUpdates } = req.body; 
        if (!taskUpdates || typeof taskUpdates !== "object" || Array.isArray(taskUpdates)) {
            return res.status(400).json({ message: "taskUpdates không hợp lệ" });
        }

        const result = await markTasksCompleted(req.user.userId, taskUpdates);

        res.json({
            message: `Cập nhật thành công ${result.modifiedCount} task`,
            result
        });
    } catch (err) {
        next(err);
    }
};

export const getTaskDatesByMonthController = async (req, res) => {
    try {
        const { year, month } = req.query;
        if (!year || !month) {
            return res.status(400).json({ message: "Missing year or month" });
        }

        const dates = await getTaskDatesByMonth(year, month);
        res.json({ dates });
    } catch (err) {
        console.error("getTaskDatesByMonth error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const createTasksRangeController = async (req, res, next) => {
    try {
        const { title, description, createdAt, dateEnd } = req.body;

        if (!title || !createdAt || !dateEnd) {
            return res.status(400).json({ message: "Thiếu tham số bắt buộc" });
        }

        const tasks = await createTasksRange(
            { title, description, createdAt, dateEnd },
            req.user.userId
        );

        res.status(201).json({
            message: `Tạo thành công ${tasks.length} task`,
            tasks
        });
    } catch (err) {
        next(err);
    }
};

export const getYearlyCompletionController = async (req, res, next) => {
    try {
        const { year } = req.query;
        if (!year) {
            return res.status(400).json({ message: "Thiếu tham số year" });
        }

        const stats = await getYearlyCompletion(req.user.userId, year);
        res.json(stats);
    } catch (err) {
        next(err);
    }
};

export const getYearlyStatsByTitleController = async (req, res, next) => {
    try {
        const { year } = req.query;
        if (!year) {
            return res.status(400).json({ message: "Thiếu tham số year" });
        }

        const stats = await getYearlyStatsByTitle(req.user.userId, year);
        res.json(stats);
    } catch (err) {
        next(err);
    }
};