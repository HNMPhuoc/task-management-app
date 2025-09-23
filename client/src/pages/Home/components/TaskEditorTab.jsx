import React from "react";

export default function TaskEditorTab({ tasks, editTitles, setEditTitles, handleUpdateTask, handleDeleteTask, loading }) {
    return (
        <div className="min-h-[240px] mb-3">
            {tasks.length === 0 ? (
                <div className="flex items-center justify-center flex-1 min-h-[240px]">
                    <p className="text-gray-400 text-sm">Không có task nào</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <div key={task._id} className="flex items-center gap-2">
                            <input
                                type="text"
                                className="flex-1 rounded px-2 py-1 bg-neutral-800 text-sm"
                                value={editTitles[task._id] ?? task.title}
                                onChange={(e) =>
                                    setEditTitles({ ...editTitles, [task._id]: e.target.value })
                                }
                            />
                            <button
                                onClick={() => handleUpdateTask(task._id)}
                                disabled={loading}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded text-sm"
                            >
                                Lưu
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task._id)}
                                disabled={loading}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
