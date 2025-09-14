import { getStatsService, getYearlyByTitleService } from "../../services/stats/statsService";

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

export const getYearlyByTitle = async (year) => {
    try {
        return await getYearlyByTitleService(year);
    } catch (err) {
        console.error("Get YearlyByTitle API error:", err);
        return [];
    }
};