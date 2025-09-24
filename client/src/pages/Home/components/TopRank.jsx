import React, { useEffect } from "react";
import { useStatsStore } from "../../../store/statsStore";

export default function TopRank() {
    const { topTasks, fetchTopTasks } = useStatsStore();

    useEffect(() => {
        const year = new Date().getFullYear();
        fetchTopTasks(year);
    }, [fetchTopTasks]);

    const sortedTasks = [...topTasks].sort(
        (a, b) => b.percentCompleted - a.percentCompleted
    );

    return (
        <div className="bg-neutral-900 rounded-xl p-4 text-white shadow-md lg:[grid-area:banner2]">
            <h2 className="text-lg font-semibold mb-2 text-emerald-400">
                Top 10 Task Completed
            </h2>

            {sortedTasks.length === 0 ? (
                <p className="text-gray-400 text-sm text-center">
                    Không có dữ liệu
                </p>
            ) : (
                <div className="group relative">
                    <div className="overflow-y-auto max-h-64 pr-1 scrollbar-hide hover:scrollbar-show">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-300 border-b border-neutral-700">
                                    <th className="py-1">Tên Task</th>
                                    <th className="py-1 text-right">% Hoàn thành</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedTasks.map((task, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b border-neutral-800 hover:bg-neutral-800/50 transition"
                                    >
                                        <td className="py-1">{task.title}</td>
                                        <td className="py-1 text-right text-emerald-400 font-semibold">
                                            {task.percentCompleted}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Scrollbar custom giống ListTask */}
                    <style>{`
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
