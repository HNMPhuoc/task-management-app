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

export const markTasksCompletedApi = async (taskUpdates) => {
    try {
        const response = await axiosClient.put(
            "/tasks/mark-completed",
            { taskUpdates },
            { withCredentials: true }
        );
        return response.result;
    } catch (error) {
        console.error("markTasksCompletedApi error:", error);
        throw error.response?.data || { message: "Cập nhật task thất bại" };
    }
};

export const createTasksRangeApi = async ({ title, description, createdAt, dateEnd }) => {
    try {
        return await axiosClient.post(
            "/tasks/range",
            { title, description, createdAt, dateEnd },
            { withCredentials: true }
        );
    } catch (error) {
        console.error("createTasksRangeApi error:", error);
        throw error.response?.data || { message: "Tạo task thất bại" };
    }
};

export const getYearlyCompletionApi = async (year) => {
    try {
        const response = await axiosClient.get(`/tasks/stats/yearly`, {
            params: { year },
            withCredentials: true,
        });
        return response || [];
    } catch (error) {
        console.error("getYearlyCompletionApi error:", error);
        return [];
    }
};

export const updateTaskApi = async (taskId, updateData) => {
    try {
        const response = await axiosClient.put(
            `/tasks/${taskId}`,
            updateData,
            { withCredentials: true }
        );
        return response.task; // backend trả { message, task }
    } catch (error) {
        console.error("updateTaskApi error:", error);
        throw error.response?.data || { message: "Cập nhật task thất bại" };
    }
};

export const deleteTaskApi = async (taskId) => {
    try {
        const response = await axiosClient.delete(
            `/tasks/${taskId}`,
            { withCredentials: true }
        );
        return response.message;
    } catch (error) {
        console.error("deleteTaskApi error:", error);
        throw error.response?.data || { message: "Xóa task thất bại" };
    }
};