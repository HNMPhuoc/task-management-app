import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom Input
const TextFieldColor = styled(TextField)({
    "& label": {
        color: "#9ca3af", // text-gray-400
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

export default function CustomInput({ label, ...props }) {
    return <TextFieldColor label={label} {...props} />;
}

// Custom Loading Button (dùng luôn Button mới của MUI v6)
export const CustomLoadingButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "loading",
})(({ loading }) => ({
    textTransform: "none",
    borderRadius: "12px",
    fontWeight: 600,
    paddingTop: "10px",
    paddingBottom: "10px",
    background:
        "linear-gradient(to right, oklch(0.723 0.219 149.579), oklch(0.704 0.14 182.503))",
    color: "#fff",
    opacity: loading ? 0.7 : 1,
    pointerEvents: loading ? "none" : "auto",
    "&:hover": {
        background:
            "linear-gradient(to right, oklch(0.704 0.14 182.503), oklch(0.723 0.219 149.579))",
    },
    position: "relative",
    "&::after": loading
        ? {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "20px",
            height: "20px",
            border: "2px solid white",
            borderTop: "2px solid transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            transform: "translate(-50%, -50%)",
        }
        : {},
    "@keyframes spin": {
        "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
        "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
    },
}));
