import axiosClient from "./axiosClient";

// Lấy danh sách task
export const getTasksApi = async () => {
    try {
        const response = await axiosClient.get("/tasks");
        return response.tasks || [];
    } catch (error) {
        console.error("getTasksApi error:", error);
        return [];
    }
};

export const getTasksByDateApi = async (date, token) => {
    try {
        const response = await axiosClient.get(`/tasks/by-date`, {
            params: { date },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.tasks || [];
    } catch (error) {
        console.error("getTasksByDateApi error:", error);
        return [];
    }
};

export const getTaskDatesByMonthApi = async (year, month) => {
    try {
        const response = await axiosClient.get(`/tasks/by-month`, {
            params: { year, month },
            withCredentials: true,
        });
        return response.dates || [];
    } catch (error) {
        console.error("getTaskDatesByMonthApi error:", error);
        return [];
    }
};
