import React from "react";
import CustomInput from "../../../components/Forms/customColor";
import PasswordField from "../../../components/Forms/customPasswordColor";
import Showerror from "./Showerror";

const FormInput = ({ label, type, value, onChange, error }) => {
    return (
        <div className="mt-3 w-full">
            {type === "password" ? (
                <PasswordField
                    error={!!error}
                    name={label.toLowerCase()}
                    label={label}
                    id={label.toLowerCase()}
                    autoComplete={label.toLowerCase()}
                    value={value}
                    onChange={onChange}
                    required
                />
            ) : (
                <CustomInput
                    error={!!error}
                    className="w-full"
                    label={label}
                    type={type}
                    autoComplete={label.toLowerCase()}
                    value={value}
                    onChange={onChange}
                    required
                />
            )}

            {/* Hiển thị lỗi */}
            {error && <Showerror errorString={error} />}
        </div>
    );
};

export default FormInput;
