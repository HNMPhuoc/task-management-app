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
