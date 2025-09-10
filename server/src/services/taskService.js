import { Task } from '../models/Task.js';
import { toObjectId } from '../utils/toObjectId.js';
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
    const stats = await Task.aggregate([
        { $match: { owner: toObjectId(userId) } },
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                completed: {
                    $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
                }
            }
        }
    ]);

    if (stats.length === 0) {
        return { total: 0, completed: 0, percentCompleted: 0, percentIncomplete: 0 };
    }

    const { total, completed } = stats[0];
    const percentCompleted = Math.round((completed / total) * 100);
    const percentIncomplete = 100 - percentCompleted;

    return { total, completed, percentIncomplete, percentCompleted };
};

export const getTasksByDate = async (userId, date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return await Task.find({
        owner: userId,
        createdAt: { $gte: start, $lte: end }
    });
};