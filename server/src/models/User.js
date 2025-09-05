import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true }, // sẽ hash trước khi lưu
    },
    { timestamps: true } // tự động thêm createdAt, updatedAt
);

export const User = mongoose.model('User', userSchema);
