import React from "react";

export default function TitleForm({ type }) {
    let title = "";
    let titleExcept = "";
    let btnExcept = "";
    let href = "";

    if (type === "login") {
        title = "Đăng nhập vào tài khoản của bạn";
        titleExcept = "Bạn chưa có tài khoản?";
        btnExcept = "Đăng ký ngay";
        href = "/register";
    } else if (type === "register") {
        title = "Đăng ký tài khoản";
        titleExcept = "Bạn đã có tài khoản?";
        btnExcept = "Đăng nhập ngay";
        href = "/login";
    } else if (type === "forgotPassword" || type === "changePassword") {
        title = "Quên mật khẩu";
        titleExcept = "Bạn đã nhớ tài khoản?";
        btnExcept = "Đăng nhập ngay";
        href = "/login";
    }

    return (
        <div className="flex items-center flex-col text-center">
            {/* Logo chữ Task Manager */}
            <h1 className="text-3xl font-[Poppins-Bold] bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text text-transparent">
                Task Manager
            </h1>

            {/* Tiêu đề form */}
            <h2 className="mt-6 text-xl font-semibold leading-7 tracking-tight text-gray-200">
                {title}
            </h2>

            {/* Link chuyển đổi */}
            <p className="mt-2 text-sm leading-6 text-gray-400">
                {titleExcept}{" "}
                <a
                    href={href}
                    className="font-semibold text-emerald-400 hover:text-emerald-300 transition"
                >
                    {btnExcept}
                </a>
            </p>
        </div>
    );
}
