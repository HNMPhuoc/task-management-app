import axios from "axios";
import Cookies from "js-cookie";
import { StorageKeys } from "../key/keys.js";

// Base URL backend chạy port 4000
const API_BASE_URL = "http://localhost:4000/api/";

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor: thêm token nếu có
axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get(StorageKeys.ACCESS_TOKEN);
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Response interceptor: xử lý dữ liệu trả về + lỗi
axiosClient.interceptors.response.use(
    (response) => {
        // backend của bạn trả về JSON, nên lấy luôn response.data
        return response.data;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 401) {
                return Promise.reject({
                    status: 401,
                    message: data.message || "Tài khoản hoặc mật khẩu không đúng",
                });
            } else if (status === 400) {
                return Promise.reject({
                    status: 400,
                    message: data.message || "Yêu cầu không hợp lệ",
                });
            } else if (status === 500) {
                return Promise.reject({
                    status: 500,
                    message: data.message || "Lỗi server, vui lòng thử lại",
                });
            }
            // các status khác
            return Promise.reject({
                status,
                message: data.message || "Có lỗi xảy ra",
            });
        } else {
            // Trường hợp không kết nối được server
            return Promise.reject({
                status: null,
                message: error.message || "Không thể kết nối đến server",
            });
        }
    },
);

export default axiosClient;
