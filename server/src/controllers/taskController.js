import { createTask, getTasks, updateTask, deleteTask } from '../services/taskService.js';

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
