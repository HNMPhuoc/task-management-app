// store/statsStore.js
import { create } from "zustand";
import { getStats } from "../services/api/stats";

export const useStatsStore = create((set) => ({
    stats: {
        total: 0,
        completed: 0,
        percentIncomplete: 0,
        percentCompleted: 0,
    },
    fetchStats: async () => {
        try {
            const data = await getStats();
            set({ stats: data });
        } catch (err) {
            console.error("fetchStats error:", err);
        }
    },
}));
