import axiosClient from "../../services/api/axiosClient";
import Cookies from "js-cookie";

// Service xử lý logic thống kê
export const getStatsService = async () => {
    try {
        const token = Cookies.get("ACCESS_TOKEN");

        if (!token) {
            return {
                total: 0,
                completed: 0,
                percentIncomplete: 0,
                percentCompleted: 0,
            };
        }

        return await axiosClient.get("/tasks/stats", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    } catch (error) {
        console.error("Stats Service error:", error);
        return {
            total: 0,
            completed: 0,
            percentIncomplete: 0,
            percentCompleted: 0,
        };
    }
};

export const getYearlyByTitleService = async (year) => {
    try {
        const token = Cookies.get("ACCESS_TOKEN");

        if (!token) {
            return [];
        }

        return await axiosClient.get(`/tasks/stats/yearly-by-title`, {
                    params: { year },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    } catch (error) {
        console.error("getYearlyByTitleService error:", error);
        return [];
    }
};