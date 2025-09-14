import React, { useEffect} from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import useFormattedDate from "../../../hooks/useFormattedDate";
import { useStatsStore } from "../../../store/statsStore";

export default function Overview() {
    const { stats, fetchStats } = useStatsStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    // Màu cho dark theme: đỏ nhạt + xanh ngọc
    const COLORS = ["#ef4444", "#10b981"];

    const pieData = [
        { name: "Incomplete", value: stats.percentIncomplete },
        { name: "Completed", value: stats.percentCompleted },
    ];

    const formattedDate = useFormattedDate();

    return (
        <div className="rounded-xl p-4 text-white shadow-md flex flex-col items-center justify-center w-full h-full bg-transparent">
            <h2 className="font-bold text-sm mb-2 text-gray-300">{formattedDate}</h2>
            <div className="relative w-[200px] h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={3}
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-100">
                    {stats.completed}/{stats.total}
                </div>
            </div>
            <p className="mt-1 text-sm text-gray-400">
                {stats.percentCompleted.toFixed(0)}% Completed
            </p>
        </div>
    );
}
