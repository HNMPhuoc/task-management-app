import React, { useEffect } from "react";
import { useStatsStore } from "../../../store/statsStore";

export default function TopRank() {
    const { topTasks, fetchTopTasks } = useStatsStore();

    useEffect(() => {
        const year = new Date().getFullYear();
        fetchTopTasks(year);
    }, [fetchTopTasks]);

    // sort từ cao xuống thấp (phòng backend trả ngược)
    const sortedTasks = [...topTasks].sort(
        (a, b) => b.percentCompleted - a.percentCompleted
    );

    return (
        <div className="bg-neutral-900 rounded-xl p-6 text-white shadow-md lg:[grid-area:banner2]">
            <h2 className="text-lg font-semibold mb-4 text-emerald-400">
                Top 10 Task
            </h2>
            <div className="overflow-y-auto max-h-64">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-300 border-b border-neutral-700">
                            <th className="py-1">Tên Task</th>
                            <th className="py-1 text-right">% Hoàn thành</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="2"
                                    className="text-center py-2 text-gray-500"
                                >
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            sortedTasks.map((task, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b border-neutral-800 hover:bg-neutral-800/50 transition"
                                >
                                    <td className="py-1">{task.title}</td>
                                    <td className="py-1 text-right text-emerald-400 font-semibold">
                                        {task.percentCompleted}%
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
