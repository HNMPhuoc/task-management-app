import { useMemo } from "react";

function getDaySuffix(day) {
    if (day > 3 && day < 21) {
        return "th";
    }
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

export default function useFormattedDate(dateInput = new Date()) {
    return useMemo(() => {
        const today = new Date(dateInput);

        const weekday = today.toLocaleDateString("en-US", { weekday: "long" }); // Monday
        const day = today.getDate(); // 5
        const suffix = getDaySuffix(day);
        const month = today.toLocaleDateString("en-US", { month: "long" }); // September
        const year = today.getFullYear(); // 2025

        return { weekday, day, suffix, month, year };
    }, [dateInput]);
}
