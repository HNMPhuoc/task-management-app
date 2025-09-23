import React, { useState, useEffect } from "react";
import { createTasksRangeApi, markTasksCompletedApi } from "../../../services/api/taskApi";
import { useTaskStore } from "../../../store/taskStore";
import { useStatsStore } from "../../../store/statsStore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import toast from "react-hot-toast";
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
    },
});

export default function TaskModal({ open, onClose, selectedDate }) {
    const { tasks, fetchTasksByDate, addTaskDate, updateTasksCompleted, fetchYearlyStats } = useTaskStore();
    const { fetchStats,  fetchTopTasks } = useStatsStore();
    const [activeTab, setActiveTab] = useState("create");
    const [form, setForm] = useState({
        title: "",
        description: "",
        dateEnd: selectedDate,
    });
    const [loading, setLoading] = useState(false);
    const [checkedTasks, setCheckedTasks] = useState({});

    useEffect(() => {
        if (open) {
            setForm({
                title: "",
                description: "",
                dateEnd: selectedDate,
            });
        }
    }, [open, selectedDate]);


    useEffect(() => {
        if (open && activeTab === "attendance" && selectedDate) {
            const formattedDate =
                typeof selectedDate === "string"
                    ? selectedDate
                    : new Date(selectedDate).toISOString().split("T")[0]; // YYYY-MM-DD
            fetchTasksByDate(formattedDate);
        }
    }, [open, activeTab, selectedDate, fetchTasksByDate]);


    if (!open) {
        return null;
    }

    const handleCreateTask = async () => {
        try {
            setLoading(true);
            await createTasksRangeApi({
                ...form,
                createdAt: selectedDate,
            });
            addTaskDate(selectedDate);
            await fetchStats();
            const currentYear = new Date().getFullYear();
            await fetchYearlyStats(currentYear);
            await fetchTopTasks(currentYear);
            await fetchTasksByDate(
                typeof selectedDate === "string"
                    ? selectedDate
                    : new Date(selectedDate).toISOString().split("T")[0]
            );
            toast.success("Tạo task thành công!");
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Tạo task thất bại!");
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (taskId) => {
        setCheckedTasks((prev) => ({
            ...prev,
            [taskId]: !prev[taskId],
        }));
    };

    const handleMarkCompleted = async () => {
        try {
            setLoading(true);
            const taskIds = Object.keys(checkedTasks).filter((id) => checkedTasks[id]);
            if (taskIds.length === 0) {
                toast.error("Hãy chọn ít nhất 1 task để hoàn thành!");
                return;
            }
            await markTasksCompletedApi(taskIds);
            updateTasksCompleted(taskIds);
            await fetchStats();
            const currentYear = new Date().getFullYear();
            await fetchYearlyStats(currentYear);
            await fetchTopTasks(currentYear);
            toast.success("Điểm danh thành công!");
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Điểm danh thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Backdrop blur */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal content */}
            <div className="relative bg-neutral-900 text-white rounded-xl shadow-lg w-[420px] p-5 z-10">
                {/* Tabs */}
                <div className="flex border-b border-neutral-700 mb-4">
                    <button
                        className={`flex-1 py-2 text-sm ${activeTab === "create"
                            ? "border-b-2 border-emerald-500 text-emerald-400 font-semibold"
                            : "text-gray-400 hover:text-gray-200"
                            }`}
                        onClick={() => setActiveTab("create")}
                    >
                        Tạo Task
                    </button>
                    <button
                        className={`flex-1 py-2 text-sm ${activeTab === "attendance"
                            ? "border-b-2 border-emerald-500 text-emerald-400 font-semibold"
                            : "text-gray-400 hover:text-gray-200"
                            }`}
                        onClick={() => setActiveTab("attendance")}
                    >
                        Điểm danh
                    </button>
                </div>

                {/* Nội dung tab */}
                {activeTab === "create" ? (
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
                                                textField: {
                                                    fullWidth: true,
                                                    size: "small",
                                                    variant: "outlined",
                                                    sx: {
                                                        "& .MuiInputBase-root": {
                                                            backgroundColor: "#1f2937",
                                                        },
                                                        "& .MuiInputBase-input": {
                                                            color: "#fff",
                                                            fontWeight: 600,
                                                        },
                                                        "& .MuiInputLabel-root": {
                                                            color: "#9ca3af",
                                                        },
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#374151",
                                                        },
                                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#10b981",
                                                        },
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#10b981",
                                                        },
                                                        "& .MuiSvgIcon-root": {
                                                            color: "#9ca3af",
                                                        },
                                                        "& .MuiPickersSectionList-root": {
                                                            color: "#fff",
                                                        },
                                                    },
                                                },
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
                ) : (
                    <div className="min-h-[240px] mb-3">
                        {tasks.length === 0 ? (
                            <div className="flex items-center justify-center flex-1 min-h-[240px]">
                                <p className="text-gray-400 text-sm">Không có task nào trong ngày này</p>
                            </div>
                        ) : (
                            <div className="min-h-[230px] overflow-y-auto mb-3">
                                {tasks.map((task) => (
                                    <div
                                        key={task._id}
                                        className="flex items-center justify-between py-2 border-b border-neutral-700"
                                    >
                                        <span
                                            className={`text-sm ${task.completed ? "line-through text-gray-400" : ""
                                                }`}
                                        >
                                            {task.title}
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={checkedTasks[task._id] ?? task.completed}
                                            onChange={() => handleCheckboxChange(task._id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        <button
                            onClick={handleMarkCompleted}
                            disabled={loading}
                            className="bg-emerald-600 hover:bg-emerald-700 transition text-white px-4 py-2 rounded-lg w-full"
                        >
                            {loading ? "Đang điểm danh..." : "Hoàn thành"}
                        </button>
                    </div>
                )}

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
