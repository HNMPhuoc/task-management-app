import { create } from "zustand";
import {
    getTasksApi,
    getTasksByDateApi,
    getTaskDatesByMonthApi,
    getYearlyCompletionApi,
    updateTaskApi,
    deleteTaskApi
} from "../services/api/taskApi";
import dayjs from "dayjs";

export const useTaskStore = create((set, get) => ({
    tasks: [],
    taskDates: [],
    yearlyStats: [],
    searchQuery: "",
    filteredTasks: [],
    selectedDate: null,

    fetchTasks: async () => {
        const data = await getTasksApi();
        set({ tasks: data, filteredTasks: data });
    },

    fetchTasksByDate: async (date) => {
        const data = await getTasksByDateApi(date);
        set({
            tasks: data,
            filteredTasks: data,
            selectedDate: date
        });
    },

    fetchTaskDatesByMonth: async (year, month) => {
        try {
            const data = await getTaskDatesByMonthApi(year, month);
            set({ taskDates: data.map((d) => dayjs(d).format("YYYY-MM-DD")) });
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            set({ taskDates: [] });
        }
    },

    fetchYearlyStats: async (year) => {
        const stats = await getYearlyCompletionApi(year);
        set({ yearlyStats: stats });
    },

    addTaskDate: (date) => {
        const { taskDates } = get();
        const formatted = dayjs(date).format("YYYY-MM-DD");
        if (!taskDates.includes(formatted)) {
            set({ taskDates: [...taskDates, formatted] });
        }
    },

    updateTasksCompleted: (result) => {
        const { completed = [], uncompleted = [] } = result;

        set((state) => ({
            tasks: state.tasks.map((task) => {
                if (completed.includes(task._id)) {
                    return { ...task, completed: true };
                }
                if (uncompleted.includes(task._id)) {
                    return { ...task, completed: false };
                }
                return task;
            }),
            filteredTasks: state.filteredTasks.map((task) => {
                if (completed.includes(task._id)) {
                    return { ...task, completed: true };
                }
                if (uncompleted.includes(task._id)) {
                    return { ...task, completed: false };
                }
                return task;
            }),
        }));
    },

    updateTask: async (taskId, updateData) => {
        const updated = await updateTaskApi(taskId, updateData);
        set((state) => ({
            tasks: state.tasks.map((t) => (t._id === taskId ? updated : t)),
            filteredTasks: state.filteredTasks.map((t) =>
                t._id === taskId ? updated : t
            ),
        }));
        return updated;
    },

    deleteTask: async (taskId) => {
        await deleteTaskApi(taskId);
        set((state) => ({
            tasks: state.tasks.filter((t) => t._id !== taskId),
            filteredTasks: state.filteredTasks.filter((t) => t._id !== taskId),
        }));
    },

    removeTaskDateIfEmpty: (date) => {
        const { tasks, taskDates } = get();
        const formatted = dayjs(date).format("YYYY-MM-DD");
        const hasTasks = tasks.some((t) => dayjs(t.dateEnd).format("YYYY-MM-DD") === formatted);
        if (!hasTasks) {
            set({ taskDates: taskDates.filter((d) => d !== formatted) });
        }
    },

    resetTaskDates: () => {
        set({ taskDates: [] });
    },

    setSearchQuery: (query) => {
        const { tasks } = get();
        const filtered = tasks.filter((t) =>
            t.title.toLowerCase().includes(query.toLowerCase())
        );
        set({ searchQuery: query, filteredTasks: filtered });
    },
}));
