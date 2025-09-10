import React, { useEffect, useState } from "react";
import { getTasksApi } from "../../../services/api/taskApi";

export default function ListTask() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTasksApi();
            setTasks(data);
        };
        fetchData();
    }, []);

    return (
        <div className="rounded-xl p-4 shadow-md bg-neutral-900 text-white lg:[grid-area:sidebar2]">
            <h2 className="text-lg font-bold mb-3">List Task</h2>

            {tasks.length === 0 ? (
                <p className="text-gray-400 text-sm">Không có task nào</p>
            ) : (
                <div className="custom-scroll overflow-y-auto max-h-72 flex flex-col gap-2 pr-1">
                    {tasks.slice().map((task) => (
                        <div
                            key={task._id}
                            className="flex items-center justify-between px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
                        >
                            <span className="text-sm">{task.title}</span>
                            <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${task.completed
                                        ? "bg-green-600/30 text-green-300"
                                        : "bg-red-600/30 text-red-300"
                                    }`}
                            >
                                {task.completed ? "Hoàn thành" : "Chưa xong"}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}
