import axiosClient from "./axiosClient.js";
import { setToken } from "../auth/auth.js";
import Cookies from "js-cookie";
import { StorageKeys } from "../key/keys.js";
import { useAuthStore } from "../../store/authStore.js";

// Đăng ký
export const register = async (registerRequest) => {
    try {
        const url = "/users/register";
        const data = await axiosClient.post(url, registerRequest);

        const { token, user, message } = data;

        setToken(token, user.username);

        const { login } = useAuthStore.getState();
        login(user);

        return { token, user, message };
    } catch (error) {
        console.error("Register error:", error);
        throw error.response?.data || { message: "Đăng ký thất bại" };
    }
};



// Đăng nhập
export const login = async (loginRequest) => {
    try {
        const url = "/users/login";
        const response = await axiosClient.post(url, loginRequest);

        // response chính là object { message, user, token }
        console.log(">>> Login response:", response);

        const { user, token, message } = response;

        if (!user || !token) {
            throw new Error("API không trả về user hoặc token hợp lệ");
        }

        setToken(token, user.username);

        const { login } = useAuthStore.getState();
        login(user);

        return { user, token, message };
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};



// Lấy user hiện tại
export const getCurrentUser = async () => {
    try {
        const url = "/users/me";
        const response = await axiosClient.get(url);
        return response.user;
    } catch (error) {
        console.error("Get current user error:", error);
        throw error;
    }
};

export const logout = () => {
    Cookies.remove(StorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(StorageKeys.USER_NAME);

    const { logout } = useAuthStore.getState();
    logout();
};