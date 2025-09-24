import React from "react";

export default function TaskAttendanceTab({ tasks, checkedTasks, handleCheckboxChange, handleMarkCompleted, loading }) {
    return (
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
                            <span className={`text-sm ${task.completed ? "line-through text-gray-400" : ""}`}>
                                {task.title}
                            </span>
                            <input
                                type="checkbox"
                                className="accent-emerald-500"
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
    );
}
