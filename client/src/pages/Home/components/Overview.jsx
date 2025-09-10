import React, { useEffect, useState } from "react";
import { getStats } from "../../../services/api/stats";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import useFormattedDate from "../../../hooks/useFormattedDate";

export default function Overview() {
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        percentIncomplete: 0,
        percentCompleted: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getStats();
            setStats(
                data || {
                    total: 0,
                    completed: 0,
                    percentIncomplete: 0,
                    percentCompleted: 0,
                }
            );
        };
        fetchStats();
    }, []);

    // Màu cho dark theme: đỏ nhạt + xanh ngọc
    const COLORS = ["#ef4444", "#10b981"];

    const pieData = [
        { name: "Incomplete", value: stats.percentIncomplete },
        { name: "Completed", value: stats.percentCompleted },
    ];

    const formattedDate = useFormattedDate();

    return (
        <div className="rounded-xl p-4 text-white shadow-md flex flex-col items-center justify-center w-full h-[220px] bg-transparent">
            {/* Ngày */}
            <h2 className="font-bold text-sm mb-2 text-gray-300">{formattedDate}</h2>

            {/* Chart container */}
            <div className="relative w-[120px] h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={55}
                            paddingAngle={3}
                        >
                            {pieData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* số Completed/Total */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold text-gray-100">
                    {stats.completed}/{stats.total}
                </div>
            </div>

            {/* % Completed */}
            <p className="mt-1 text-xs text-gray-400">
                {stats.percentCompleted.toFixed(0)}% Completed
            </p>
        </div>
    );
}
