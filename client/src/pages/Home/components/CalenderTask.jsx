/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTaskStore } from "../../../store/taskStore";
import { getTaskDatesByMonthApi } from "../../../services/api/taskApi";
import { useAuthStore } from "../../../store/authStore";
import dayjs from "dayjs";

export default function CalendarTask() {
    const { fetchTasksByDate } = useTaskStore();
    const { isAuthenticated } = useAuthStore();
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [taskDates, setTaskDates] = useState([]);

    useEffect(() => {
        const fetchTaskDates = async () => {
            if (!isAuthenticated) {
                setTaskDates([]); // reset khi chưa login
                return;
            }
            try {
                const year = currentDate.year();
                const month = currentDate.month() + 1;

                const data = await getTaskDatesByMonthApi(year, month);
                setTaskDates(data.map(d => dayjs(d).format("YYYY-MM-DD")));
            } catch (error) {
                setTaskDates([]);
            }
        };
        fetchTaskDates();
    }, [currentDate, isAuthenticated]);


    const monthDays = useMemo(() => {
        const startOfMonth = currentDate.startOf("month");
        const daysInMonth = currentDate.daysInMonth();
        const startDay = startOfMonth.day() === 0 ? 7 : startOfMonth.day();
        const days = [];
        for (let i = 1; i < startDay; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++) {
            const date = startOfMonth.date(i);
            days.push(date);
        }
        return days;
    }, [currentDate]);

    const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
    const goToNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

    const handleDayClick = (date) => {
        if (!isAuthenticated) {
            return;
        }
        const formatted = date.format("YYYY-MM-DD");
        fetchTasksByDate(formatted);
    };

    return (
        <div className="rounded-xl p-4 shadow-md bg-neutral-900 text-white lg:[grid-area:banner3]">
            <div className="flex items-center justify-between mb-3">
                <button onClick={goToPrevMonth} className="p-2 rounded-full hover:bg-neutral-700">
                    <ChevronLeft size={18} />
                </button>
                <h2 className="text-lg font-bold">
                    {currentDate.format("MMMM, YYYY")}
                </h2>
                <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-neutral-700">
                    <ChevronRight size={18} />
                </button>
            </div>

            <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-300 mb-2">
                <div>Mon</div><div>Tue</div><div>Wed</div>
                <div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
                {monthDays.map((date, idx) =>
                    date ? (
                        <div
                            key={idx}
                            onClick={() => handleDayClick(date)}
                            className={`h-10 flex items-center justify-center rounded-lg cursor-pointer 
                                ${taskDates.includes(date.format("YYYY-MM-DD"))
                                    ? "bg-emerald-600 text-white font-bold"
                                    : "bg-neutral-800 text-gray-200 hover:bg-neutral-700"
                                }`}
                        >
                            {date.date()}
                        </div>
                    ) : (
                        <div key={idx} className="h-10" />
                    )
                )}
            </div>
        </div>
    );
}
