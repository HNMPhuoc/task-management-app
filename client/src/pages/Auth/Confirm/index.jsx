import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { getCurrentUser } from "../../../services/api/auth.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Confirm({ title }) {
    const navigate = useNavigate();
    const [token, setToken] = useState("");

    useEffect(() => {
        document.title = title ? `${title}` : "Trang không tồn tại";

        // Lấy token từ query string
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");
        setToken(tokenFromUrl);
    }, [title]);

    useEffect(() => {
        if (token) {
            handleCheckVerify();
        }
    }, [token]);

    const handleCheckVerify = async () => {
        try {
            const response = await getCurrentUser({ token });
            toast.success(response.message, {
                onClose: () => navigate("/"),
                autoClose: 2000,
                closeButton: false,
            });
        } catch (err) {
            toast.error(err.message || "Xác thực thất bại");
            console.error("Error fetching server: ", err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-72 h-72">
                <DotLottieReact
                    src="https://lottie.host/59f5e53d-ce7c-4d60-aaa9-7ba750fc86a8/OhazetStzz.json"
                    loop
                    autoplay
                />
            </div>
        </div>
    );
}
