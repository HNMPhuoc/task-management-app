import React, { useEffect, useState } from "react";
import { useTaskStore } from "../../../store/taskStore";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export default function ChartColumn() {
    const { yearlyStats, fetchYearlyStats } = useTaskStore();
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    useEffect(() => {
        fetchYearlyStats(selectedYear);
    }, [selectedYear, fetchYearlyStats]);

    // Tạo danh sách năm (5 năm gần đây + năm hiện tại)
    const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

    return (
        <div className="bg-neutral-900 rounded-xl p-6 text-white shadow-md lg:[grid-area:banner1]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Tỷ lệ hoàn thành theo tháng</h2>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="bg-neutral-800 text-white text-sm rounded px-2 py-1 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={yearlyStats}>
                    <defs>
                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis
                        domain={[0, 100]}
                        stroke="#9ca3af"
                        tickFormatter={(val) => `${val}%`}
                    />
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Area
                        type="monotone"
                        dataKey="percentCompleted"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorCompleted)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
