import { create } from "zustand";
import { getTasksApi, getTasksByDateApi } from "../services/api/taskApi";

export const useTaskStore = create((set, get) => ({
    tasks: [],
    searchQuery: "",
    filteredTasks: [],

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

    setSearchQuery: (query) => {
        const { tasks } = get();
        const filtered = tasks.filter((t) =>
            t.title.toLowerCase().includes(query.toLowerCase())
        );
        set({ searchQuery: query, filteredTasks: filtered });
    },
}));
