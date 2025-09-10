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

// Lấy danh sách task theo ngày
//param {string} date - ngày theo định dạng YYYY-MM-DD
//param {string} token - token xác thực
//ví dụ http://localhost:4000/api/tasks/by-date?date=2025-09-09
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