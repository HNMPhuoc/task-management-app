import { create } from "zustand";
import { getUserInfo, checkAuth, clearToken } from "../services/auth/auth";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,

    initAuth: () => {
        if (checkAuth()) {
            const { name } = getUserInfo();
            set({ user: { username: name }, isAuthenticated: true });
        } else {
            clearToken();
            set({ user: null, isAuthenticated: false });
        }
    },

    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => {
        clearToken();
        set({ user: null, isAuthenticated: false });
    },
}));
