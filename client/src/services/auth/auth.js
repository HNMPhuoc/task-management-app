import { StorageKeys } from "../key/keys.js";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getUserInfo = () => {
    const name = localStorage.getItem(StorageKeys.USER_NAME);
    const token = Cookies.get(StorageKeys.ACCESS_TOKEN);
    return { name, token };
};

export const checkAuth = () => {
    return !!Cookies.get(StorageKeys.ACCESS_TOKEN);
};

export const setToken = (token, name) => {
    try {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;

        Cookies.set(StorageKeys.ACCESS_TOKEN, token, {
            expires: new Date(expirationTime),
        });
        localStorage.setItem(StorageKeys.USER_NAME, name);
    } catch (error) {
        console.error("Invalid token:", error);
    }
};

export const clearToken = () => {
    Cookies.remove(StorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(StorageKeys.USER_NAME);
};