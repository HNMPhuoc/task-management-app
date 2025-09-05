import { registerUser, loginUser, getCurrentUser } from '../services/userService.js';

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const { user, token } = await registerUser({ username, email, password });

        res.status(201).json({
            message: 'Đăng ký thành công',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);

        res.status(200).json({
            message: 'Đăng nhập thành công',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        });
    } catch (err) {
        next(err);
    }
};

export const me = async (req, res, next) => {
    try {
        const user = await getCurrentUser(req.user.userId);
        res.json({ user });
    } catch (err) {
        next(err);
    }
};
