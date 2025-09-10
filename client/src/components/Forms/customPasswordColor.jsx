import React, { useState, useMemo, useCallback, useRef } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const TextFieldColor = styled(TextField)({
    "& label": {
        color: "#9ca3af", // gray-400
    },
    "& label.Mui-focused": {
        color: "oklch(0.704 0.14 182.503)", // teal-500
    },
    "& .MuiOutlinedInput-root": {
        color: "#e5e7eb", // text-gray-200
        backgroundColor: "#111827", // bg-gray-900
        "& fieldset": {
            borderColor: "#374151", // gray-700
        },
        "&:hover fieldset": {
            borderColor: "oklch(0.704 0.14 182.503)", // teal-500
        },
        "&.Mui-focused fieldset": {
            borderColor: "oklch(0.723 0.219 149.579)", // green-500
        },
    },
});

const PasswordVisibilityToggle = ({ showPassword, onClick }) => (
    <InputAdornment position="end">
        <IconButton
            aria-label="toggle password visibility"
            onClick={onClick}
            edge="end"
            sx={{ color: "#9ca3af" }} // gray-400 icon
        >
            {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
    </InputAdornment>
);

function PasswordField({
    label,
    name = "password",
    id = "password",
    autoComplete = "current-password",
    value,
    onChange,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [hasValuePassword, setHasValuePassword] = useState(false);
    const passwordRef = useRef(null);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = useCallback(
        (e) => {
            setHasValuePassword(passwordRef.current.value.length > 0);
            if (onChange) {
                onChange(e);
            }
        },
        [onChange]
    );

    const endAdornment = useMemo(() => {
        if (!hasValuePassword) {
            return null;
        }
        return (
            <PasswordVisibilityToggle
                showPassword={showPassword}
                onClick={handleClickShowPassword}
            />
        );
    }, [hasValuePassword, showPassword]);

    return (
        <div className="mt-2">
            <TextFieldColor
                {...props}
                margin="normal"
                fullWidth
                name={name}
                label={label}
                type={showPassword ? "text" : "password"}
                id={id}
                onChange={handleChange}
                autoComplete={autoComplete}
                value={value}
                slotProps={{
                    input: {
                        endAdornment: endAdornment,
                    },
                }}
                inputRef={passwordRef}
            />
        </div>
    );
}

export default PasswordField;
