import { getStatsService } from "../../services/stats/statsService";

// API wrapper gọi từ component
export const getStats = async () => {
    try {
        return await getStatsService();
    } catch (err) {
        console.error("Get Stats API error:", err);
        return {
            total: 0,
            completed: 0,
            percentIncomplete: 0,
            percentCompleted: 0,
        };
    }
};
