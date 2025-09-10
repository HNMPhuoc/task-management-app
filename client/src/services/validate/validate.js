export const validateUsername = (username) => {
    if (!username.trim()) {
        return "Username is required";
    } else if (username.length < 3) {
        return "Username must be at least 3 characters long";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return "Username can only contain letters, numbers, and underscores";
    } else {
        return "";
    }
};

export const validateEmail = (email) => {
    if (!email.trim()) {
        return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return "Email is invalid";
    } else {
        return "";
    }
};

export const validatePassword = (password) => {
    if (!password.trim()) {
        return "Password is required";
    } else if (password.length < 6) {
        return "Password must be at least 6 characters long";
    } else {
        return "";
    }
};
