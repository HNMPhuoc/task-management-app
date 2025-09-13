import React, { useState, useEffect } from "react";
import { createTasksRangeApi, markTasksCompletedApi } from "../../../services/api/taskApi";
import { useTaskStore } from "../../../store/taskStore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";


export default function TaskModal({ open, onClose, selectedDate }) {
    const { tasks, fetchTasksByDate } = useTaskStore();
    const [activeTab, setActiveTab] = useState("create");
    const [form, setForm] = useState({
        title: "",
        description: "",
        dateEnd: selectedDate,
    });
    const [loading, setLoading] = useState(false);
    const [checkedTasks, setCheckedTasks] = useState({});

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
            alert("Tạo task thành công!");
            onClose();
        } catch (err) {
            console.error(err);
            alert("Tạo task thất bại!");
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
                alert("Hãy chọn ít nhất 1 task để hoàn thành!");
                return;
            }
            await markTasksCompletedApi(taskIds);
            alert("Điểm danh thành công!");
            onClose();
        } catch (err) {
            console.error(err);
            alert("Điểm danh thất bại!");
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
                            <DatePicker
                                label="Ngày kết thúc"
                                format="YYYY-MM-DD"
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
                                                backgroundColor: "#1f2937", // bg-neutral-800
                                                color: "white",
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: "#9ca3af", // text-gray-400
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#374151", // border-neutral-700
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#10b981", // emerald
                                            },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#10b981",
                                            },
                                            "& .MuiSvgIcon-root": {
                                                color: "#9ca3af",
                                            },
                                        },
                                    },
                                }}
                            />
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
                    <div>
                        {tasks.length === 0 ? (
                            <p className="text-gray-400 text-sm">Không có task nào trong ngày này</p>
                        ) : (
                            <div className="max-h-60 overflow-y-auto mb-3">
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
