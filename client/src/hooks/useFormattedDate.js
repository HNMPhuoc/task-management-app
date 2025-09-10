import { useMemo } from "react";

function getDayWithSuffix(day) {
    if (day > 3 && day < 21) {
        return `${day}th`;
    } // 4th-20th
    switch (day % 10) {
        case 1: return `${day}st`;
        case 2: return `${day}nd`;
        case 3: return `${day}rd`;
        default: return `${day}th`;
    }
}

export default function useFormattedDate(dateInput = new Date()) {
    return useMemo(() => {
        const today = new Date(dateInput);

        const weekday = today.toLocaleDateString("en-US", { weekday: "long" }); // Monday
        const day = getDayWithSuffix(today.getDate()); // 5th
        const month = today.toLocaleDateString("en-US", { month: "long" }); // September
        const year = today.getFullYear(); // 2025

        return `${weekday}, ${day} ${month}, ${year}`;
    }, [dateInput]);
}
