import { create } from "zustand";
import { getTasksApi, getTasksByDateApi, getTaskDatesByMonthApi, getYearlyCompletionApi } from "../services/api/taskApi";
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

    updateTasksCompleted: (taskIds) => {
        set((state) => ({
            tasks: state.tasks.map((task) =>
                taskIds.includes(task._id) ? { ...task, completed: true } : task
            ),
            filteredTasks: state.filteredTasks.map((task) =>
                taskIds.includes(task._id) ? { ...task, completed: true } : task
            ),
        }));
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
