import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { login } from "../../../services/api/auth.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../../services/validate/validate.js";
import TitleForm from "../components/TitleForm.jsx";
import AuthForm from "../components/AuthForm.jsx";

export default function Login(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        validationErrors.email = validateEmail(email);
        if (validationErrors.email === "") {
            delete validationErrors.email;
        }

        validationErrors.password = validatePassword(password);
        if (validationErrors.password === "") {
            delete validationErrors.password;
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
                const response = await login({ email, password });

                toast.success(response.message || "Đăng nhập thành công");
                navigate("/"); // chuyển ngay lập tức
            } catch (err) {
                toast.error(err.message || "Đăng nhập thất bại");
                setErrorString(err.message || "Đăng nhập thất bại");
                console.error("Error fetching server: ", err);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="min-h-full grid lg:grid-cols-2 lg:gap-4">
            {/* Form login */}
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <TitleForm type="login" />
                    <div className="mt-10">
                        <AuthForm
                            handleSubmit={handleSubmit}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            errors={errors}
                            errorString={errorString}
                            loading={loading}
                            showRePassword={false}
                            type="login"
                        />
                    </div>
                </div>
            </div>

            {/* Animation */}
            <div className="relative hidden lg:block">
                <DotLottieReact
                    style={{ width: "100%", height: "100%" }}
                    src="https://lottie.host/7af0aab9-f06a-4a96-9607-7ebe4486339b/0fYYVaUlOI.json"
                    loop
                    autoplay
                    direction="1"
                />
            </div>
        </div>
    );
}