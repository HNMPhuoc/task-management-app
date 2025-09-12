import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { checkAuth, getUserInfo } from "../../services/auth/auth";

const AuthRoute = () => {
    const { isAuthenticated, login } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated && checkAuth()) {
            const { name } = getUserInfo();
            login({ username: name });
        }
    }, [isAuthenticated, login]);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
