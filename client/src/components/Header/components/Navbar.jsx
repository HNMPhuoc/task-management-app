import { useEffect, useState } from "react";
import { AccountCircle, Logout } from "@mui/icons-material";
import { checkAuth, getUserInfo, clearToken } from "../../../services/auth/auth";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        // Lắng nghe sự kiện scroll
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);

        // Kiểm tra auth khi mount
        if (checkAuth()) {
            setIsAuth(true);
            const { name } = getUserInfo();
            setName(name || "");
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogout = () => {
        clearToken();
        setIsAuth(false);
        setName("");
        window.location.href = "/login"; // redirect về trang login
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 shadow-md transition-colors ${isScrolled ? "bg-black/90" : "bg-black"}`}
        >
            {/* Logo */}
            <h1 className="text-2xl font-[Poppins-Bold] bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text text-transparent">
                Task Manager
            </h1>

            {/* Nhóm nút bên phải */}
            <div className="flex items-center gap-4">
                {isAuth ?
                    <>
                        {/* Hiển thị user */}
                        <a
                            href="/profile"
                            className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-800 text-emerald-200 rounded-2xl 
                                            hover:bg-emerald-700 transition font-semibold shadow-md text-sm"
                        >
                            <AccountCircle fontSize="small" />
                            {name}
                        </a>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 px-4 py-1.5 bg-red-800 text-red-200 rounded-2xl 
                                            hover:bg-red-700 transition font-semibold shadow-md text-sm"
                        >
                            <Logout fontSize="small" />
                            Logout
                        </button>
                    </>
                    :
                    <>
                        {/* Nút đăng ký */}
                        <a
                            href="/register"
                            className="cursor-pointer group relative flex items-center gap-1.5 
                                            px-4 py-1.5 bg-green-800 text-green-200 rounded-2xl 
                                            hover:bg-green-700 transition font-semibold shadow-md text-sm"
                        >
                            Đăng ký
                            <div className="absolute top-full mt-2 whitespace-nowrap px-3 py-1.5 rounded-md 
                                                bg-green-900 bg-opacity-90 left-1/2 -translate-x-1/2 
                                                opacity-0 group-hover:opacity-100 transition-opacity shadow-lg 
                                                text-xs text-green-200">
                                Tạo tài khoản mới
                            </div>
                        </a>

                        {/* Nút đăng nhập */}
                        <a
                            href="/login"
                            className="cursor-pointer group relative flex items-center gap-1.5 
                                            px-4 py-1.5 bg-teal-800 text-teal-200 rounded-2xl 
                                            hover:bg-teal-700 transition font-semibold shadow-md text-sm"
                        >
                            Đăng nhập
                            <div className="absolute top-full mt-2 whitespace-nowrap px-3 py-1.5 rounded-md 
                                                bg-teal-900 bg-opacity-90 left-1/2 -translate-x-1/2 
                                                opacity-0 group-hover:opacity-100 transition-opacity shadow-lg 
                                                text-xs text-teal-200">
                                Truy cập tài khoản
                            </div>
                        </a>
                    </>}
            </div>
        </nav>
    );
}