import React from "react";
import FormInput from "./FormInput";
import { CustomLoadingButton } from "../../../components/Forms/customColor.jsx";
import ShowError from "../components/Showerror.jsx";

const AuthForm = ({
    handleSubmit,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    rePassword,
    setRePassword,
    errors,
    errorString,
    loading,
    showRePassword,
    type,
}) => {
    let btnText = "";
    if (type === "login") {
        btnText = "Đăng nhập";
    } else if (type === "register") {
        btnText = "Đăng ký";
    } else {
        btnText = "Xác nhận";
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-2 bg-black p-6 rounded-2xl shadow-lg"
        >
            {/* Username */}
            {username !== undefined && (
                <FormInput
                    label="Tên người dùng"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!errors.username}
                />
            )}

            {/* Email */}
            {email !== undefined && (
                <FormInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                />
            )}

            {/* Mật khẩu */}
            {password !== undefined && (
                <FormInput
                    label="Mật khẩu"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                />
            )}

            {/* Nhập lại mật khẩu (khi register) */}
            {showRePassword && rePassword !== undefined && (
                <FormInput
                    label="Nhập lại mật khẩu"
                    type="password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    error={!!errors.rePassword}
                />
            )}

            {/* Hiện lỗi */}
            <ShowError errorString={errorString} />

            {/* Nút submit */}
            <CustomLoadingButton
                variant="contained"
                type="submit"
                className="w-full !bg-gradient-to-r !from-emerald-500 !to-teal-600 !text-white !py-2.5 !rounded-xl !font-semibold !shadow-md hover:!from-emerald-400 hover:!to-teal-500 transition"
                loading={loading}
            >
                {btnText}
            </CustomLoadingButton>
        </form>
    );
};

export default AuthForm;
