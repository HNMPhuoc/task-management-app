import { Task } from '../models/Task.js';

export const createTask = async ({ title, description }, userId) => {
    return await Task.create({
        title,
        description,
        owner: userId,
    });
};

export const getTasks = async (userId) => {
    return await Task.find({ owner: userId });
};

export const updateTask = async (taskId, updateData, userId) => {
    const task = await Task.findOneAndUpdate(
        { _id: taskId, owner: userId },
        updateData,
        { new: true }
    );
    if (!task) {
        throw new Error('Task update failed');
    }
    return task;
};

export const deleteTask = async (taskId, userId) => {
    const task = await Task.findOneAndDelete({ _id: taskId, owner: userId });
    if (!task) {
        throw new Error('Task delete failed');
    }
    return task;
};

export const getTaskStats = async (userId) => {
    const total = await Task.countDocuments({ owner: userId });
    const completed = await Task.countDocuments({ owner: userId, completed: true });
    const percentCompleted = total === 0 ? 0 : Math.round((completed / total) * 100);
    const percentIncomplete = total === 0 ? 0 : 100 - percentCompleted;

    return {
        total,
        completed,
        percentIncomplete,
        percentCompleted,
    };
};