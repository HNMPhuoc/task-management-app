import React from 'react'

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-black shadow-md">
            {/* Logo */}
            <h1 className="text-2xl font-[Poppins-Bold] bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text text-transparent">
                Task Manager
            </h1>

            {/* Nút đăng ký */}
            <button className="cursor-pointer group relative flex items-center gap-1.5 px-6 py-2 bg-green-800 text-green-200 rounded-3xl hover:bg-green-700 transition font-semibold shadow-md">
                Đăng ký
                <div className="absolute top-full mt-2 whitespace-nowrap px-4 py-2 rounded-md bg-green-900 bg-opacity-90 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg text-sm text-green-200">
                    Tạo tài khoản mới
                </div>
            </button>
        </nav>
    )
}
