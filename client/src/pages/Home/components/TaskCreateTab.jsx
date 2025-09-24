import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
import dayjs from "dayjs";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
    components: {
        MuiPickersPopper: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    borderRadius: "12px",
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    color: "#e5e7eb",
                    "&.Mui-selected": {
                        backgroundColor: "#10b981",
                        color: "#fff",
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "#059669",
                    },
                    "&:hover": {
                        backgroundColor: "rgba(16,185,129,0.25)",
                    },
                },
                outsideCurrentMonth: {
                    color: "#6b7280", // gray-500 cho ngày ngoài tháng
                },
                today: {
                    border: "1px solid #10b981",
                },
            },
        },
        MuiPickersCalendarHeader: {
            styleOverrides: {
                label: {
                    color: "#fff",
                },
                switchViewButton: {
                    color: "#9ca3af",
                },
                iconButton: {
                    color: "#9ca3af",
                    "&:hover": { backgroundColor: "rgba(55,65,81,0.5)" },
                },
            },
        },
        MuiPickersYear: {
            styleOverrides: {
                yearButton: {
                    color: "#e5e7eb",
                    "&.Mui-selected": {
                        backgroundColor: "#10b981",
                        color: "#fff",
                    },
                },
            },
        },
        MuiPickersMonth: {
            styleOverrides: {
                monthButton: {
                    color: "#e5e7eb",
                    "&.Mui-selected": {
                        backgroundColor: "#10b981",
                        color: "#fff",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: "#4b5563",
                },
                root: {
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#10b981",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#10b981",
                        borderWidth: "1px",
                    },
                    "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                        color: "#10b981",
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: "#fff",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#10b981",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#10b981",
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: "#10b981",
                },
            },
        },
    },
});

export default function TaskCreateTab({ form, setForm, handleCreateTask, loading }) {
    return (
        <div>
            <div className="mb-3">
                <label className="block text-sm mb-1">Tiêu đề</label>
                <input
                    type="text"
                    className="w-full rounded-lg px-3 py-2 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm mb-1">Mô tả</label>
                <textarea
                    className="w-full rounded-lg px-3 py-2 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={darkTheme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Ngày kết thúc"
                                value={form.dateEnd ? dayjs(form.dateEnd) : null}
                                onChange={(newValue) =>
                                    setForm({
                                        ...form,
                                        dateEnd: newValue ? newValue.format("YYYY-MM-DD") : "",
                                    })
                                }
                                slotProps={{
                                    textField: { fullWidth: true, size: "small" },
                                }}
                            />
                        </LocalizationProvider>
                    </ThemeProvider>
                </StyledEngineProvider>
            </div>
            <button
                onClick={handleCreateTask}
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 transition text-white px-4 py-2 rounded-lg w-full"
            >
                {loading ? "Đang tạo..." : "Tạo Task"}
            </button>
        </div>
    );
}
