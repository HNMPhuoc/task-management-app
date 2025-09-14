// store/statsStore.js
import { create } from "zustand";
import { getStats, getYearlyByTitle } from "../services/api/stats";

export const useStatsStore = create((set) => ({
    stats: {
        total: 0,
        completed: 0,
        percentIncomplete: 0,
        percentCompleted: 0,
    },
    topTasks: [],


    fetchStats: async () => {
        try {
            const data = await getStats();
            set({ stats: data });
        } catch (err) {
            console.error("fetchStats error:", err);
        }
    },

    fetchTopTasks: async (year) => {
        try {
            const data = await getYearlyByTitle(year);
            set({ topTasks: data.slice(0, 10) });
        } catch (err) {
            console.error("fetchTopTasks error:", err);
        }
    },
}));
