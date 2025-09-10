import React, { useState, useMemo } from "react";
import { useTaskStore } from "../../../store/taskStore";

export default function TaskInput() {
    const { tasks, setSearchQuery } = useTaskStore();
    const [query, setQuery] = useState("");

    // Lấy gợi ý đầu tiên khớp với query
    const suggestion = useMemo(() => {
        if (!query) {
            return "";
        }
        const match = tasks.find((t) =>
            t.title.toLowerCase().startsWith(query.toLowerCase())
        );
        return match ? match.title : "";
    }, [query, tasks]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setSearchQuery(value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Tab" && suggestion) {
            e.preventDefault(); // chặn nhảy focus
            setQuery(suggestion);
            setSearchQuery(suggestion);
        }
    };

    return (
        <div className="relative w-full">
            {/* input gõ text */}
            <input
                type="text"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Tìm task..."
                className="w-full rounded-xl p-2 bg-neutral-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            {/* hiển thị hint ngay sau chữ người dùng đang gõ */}
            {suggestion && suggestion.toLowerCase() !== query.toLowerCase() && (
                <div className="absolute inset-0 flex items-center pointer-events-none">
                    <span className="w-full rounded-xl p-2 text-sm text-gray-500">
                        <span className="invisible">{query}</span>
                        {suggestion.slice(query.length)}
                    </span>
                </div>
            )}
        </div>
    );
}
