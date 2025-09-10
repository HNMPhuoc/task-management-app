import React, { useEffect } from "react";
import { useTaskStore } from "../../../store/taskStore";

export default function ListTask() {
    const { filteredTasks, fetchTasks } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <div className="rounded-xl p-4 shadow-md bg-neutral-900 text-white lg:[grid-area:sidebar2]">
            <h2 className="text-lg font-bold mb-3">List Task</h2>

            {filteredTasks.length === 0 ? (
                <p className="text-gray-400 text-sm">Không có task nào</p>
            ) : (
                <div className="group relative">
                    <div className="overflow-y-auto max-h-48 flex flex-col gap-2 pr-1 scrollbar-hide hover:scrollbar-show">
                        {filteredTasks.map((task) => (
                            <div
                                key={task._id}
                                className="flex items-center justify-between px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
                            >
                                <span className="text-sm">{task.title}</span>
                                <span
                                    className={`px-2 py-1 rounded text-xs font-semibold ${
                                        task.completed
                                            ? "bg-green-600/30 text-green-300"
                                            : "bg-red-600/30 text-red-300"
                                    }`}
                                >
                                    {task.completed ? "Hoàn thành" : "Chưa xong"}
                                </span>
                            </div>
                        ))}
                    </div>
                    <style jsx>{`
                        .scrollbar-hide {
                            scrollbar-width: none;
                            -ms-overflow-style: none;
                        }
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                        .group:hover .scrollbar-hide {
                            scrollbar-width: thin;
                            scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
                        }
                        .group:hover .scrollbar-hide::-webkit-scrollbar {
                            display: block;
                            width: 6px;
                        }
                        .group:hover .scrollbar-hide::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .group:hover .scrollbar-hide::-webkit-scrollbar-thumb {
                            background: rgba(156, 163, 175, 0.5);
                            border-radius: 3px;
                        }
                        .group:hover .scrollbar-hide::-webkit-scrollbar-thumb:hover {
                            background: rgba(156, 163, 175, 0.7);
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
}