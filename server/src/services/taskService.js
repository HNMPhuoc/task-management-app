import { Task } from '../models/Task.js';
import { toObjectId } from '../utils/toObjectId.js';
import dayjs from "dayjs";

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

export const markTasksCompleted = async (userId, taskIds) => {
    return await Task.updateMany(
            { _id: { $in: taskIds }, owner: userId, completed: false },
            { $set: { completed: true } }
        );
};

export const getTaskDatesByMonth = async (year, month) => {
    // month: 1-12
    const startDate = dayjs(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = dayjs(startDate).endOf("month").toDate();

    const tasks = await Task.find({
        createdAt: { $gte: startDate, $lte: endDate },
    }).select("createdAt");

    // Trả về unique các ngày
    return [...new Set(tasks.map(t => dayjs(t.createdAt).format("YYYY-MM-DD")))];
};

export const createTasksRange = async ({ title, description, createdAt, dateEnd }, userId) => {
    if (!createdAt || !dateEnd) {
        throw new Error("Thiếu createdAt hoặc dateEnd");
    }

    const start = dayjs(createdAt).startOf("day");
    const end = dayjs(dateEnd).endOf("day");

    if (end.isBefore(start)) {
        throw new Error("dateEnd phải sau hoặc bằng createdAt");
    }

    const tasks = [];
    let current = start.clone();
    while (current.isBefore(end) || current.isSame(end, "day")) {
        tasks.push({
            title,
            description,
            owner: userId,
            createdAt: current.toDate()
        });
        current = current.add(1, "day");
    }

    return await Task.insertMany(tasks);
};

export const getYearlyCompletion = async (userId, year) => {
    const startOfYear = dayjs(`${year}-01-01`).startOf("year").toDate();
    const endOfYear = dayjs(startOfYear).endOf("year").toDate();

    // Lấy dữ liệu trong cả năm
    const stats = await Task.aggregate([
        {
            $match: {
                owner: toObjectId(userId),
                createdAt: { $gte: startOfYear, $lte: endOfYear },
            },
        },
        {
            $group: {
                _id: { month: { $month: "$createdAt" } },
                total: { $sum: 1 },
                completed: {
                    $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] },
                },
            },
        },
    ]);

    // Map dữ liệu thành 12 tháng
    const result = Array.from({ length: 12 }, (_, i) => {
        const monthStat = stats.find((s) => s._id.month === i + 1);
        if (!monthStat) {
            return {
                month: i + 1,
                total: 0,
                completed: 0,
                percentCompleted: 0,
            };
        }
        const { total, completed } = monthStat;
        return {
            month: i + 1,
            total,
            completed,
            percentCompleted: Math.round((completed / total) * 100),
        };
    });

    return result;
};

export const getYearlyStatsByTitle = async (userId, year) => {
    const startOfYear = dayjs(`${year}-01-01`).startOf("year").toDate();
    const endOfYear = dayjs(startOfYear).endOf("year").toDate();

    const stats = await Task.aggregate([
        {
            $match: {
                owner: toObjectId(userId),
                createdAt: { $gte: startOfYear, $lte: endOfYear },
            },
        },
        {
            $group: {
                _id: "$title",
                total: { $sum: 1 },
                completed: {
                    $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] },
                },
            },
        },
        { $sort: { completed: -1 } }, // sort theo số completed nhiều nhất
    ]);

    return stats.map((s) => ({
        title: s._id,
        total: s.total,
        completed: s.completed,
        percentCompleted: s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0,
    }));
};
