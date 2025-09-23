import React from "react";

export default function Showerror({ errorString }) {
    if (!errorString || errorString.length === 0) {
        return null;
    }

    return (
        <div className="mt-2">
            <div
                className="bg-red-100 text-red-500 p-4 rounded-md"
                role="alert"
            >
                {errorString}
            </div>
        </div>
    );
}