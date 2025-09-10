import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { register } from "../../../services/api/auth.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
    validateEmail,
    validatePassword,
    validateUsername,
} from "../../../services/validate/validate.js";
import TitleForm from "../components/TitleForm.jsx";
import AuthForm from "../components/AuthForm.jsx";

export default function Register(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorString, setErrorString] = useState("");

    const { title } = props;
    useEffect(() => {
        document.title = title ? `${title}` : "Trang không tồn tại";
    }, [title]);

    async function handleSubmit(e) {
        e.preventDefault();

        // validate
        const validationErrors = {};

        validationErrors.username = validateUsername(username);
        if (validationErrors.username === "") delete validationErrors.username;

        validationErrors.email = validateEmail(email);
        if (validationErrors.email === "") delete validationErrors.email;

        validationErrors.password = validatePassword(password);
        if (validationErrors.password === "") delete validationErrors.password;

        if (password !== rePassword) {
            validationErrors.rePassword = "Passwords do not match";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length !== 0) {
            setErrorString(
                Object.entries(validationErrors)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join("\n")
            );
        } else {
            try {
                setLoading(true);
                const { message } = await register({ username, email, password });

                toast.success(message || "Đăng ký thành công");
                navigate("/");   // chuyển ngay lập tức sau khi đăng ký
            } catch (err) {
                toast.error(err.message || "Đăng ký thất bại");
                setErrorString(err.message || "Đăng ký thất bại");
                console.error("Error fetching server: ", err);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="grid lg:grid-cols-2 lg:gap-4">
            {/* Form register */}
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <TitleForm type="register" />
                    <div className="mt-4">
                        <AuthForm
                            handleSubmit={handleSubmit}
                            username={username}
                            setUsername={setUsername}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            rePassword={rePassword}
                            setRePassword={setRePassword}
                            errors={errors}
                            errorString={errorString}
                            loading={loading}
                            showRePassword={true}
                            type="register"
                        />
                    </div>
                </div>
            </div>

            {/* Animation */}
            <div className="relative hidden lg:flex items-center justify-center">
                <DotLottieReact
                    style={{ width: "70%", height: "auto", maxHeight: "80vh" }}
                    src="https://lottie.host/59f5e53d-ce7c-4d60-aaa9-7ba750fc86a8/OhazetStzz.json"
                    loop
                    autoplay
                    direction="1"
                />
            </div>
        </div>
    );
}
