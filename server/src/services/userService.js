import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { signToken } from '../config/jwt.js';

export const registerUser = async ({ username, email, password }) => {
    // Kiểm tra user tồn tại
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new Error('Username hoặc email đã tồn tại');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // Tạo token
    const token = signToken({ userId: user._id });

    return { user, token };
};

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Email không tồn tại');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Sai mật khẩu');
    }

    const token = signToken({ userId: user._id });

    return { user, token };
};

export const getCurrentUser = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('Không tìm thấy user');
    }
    return user;
};
