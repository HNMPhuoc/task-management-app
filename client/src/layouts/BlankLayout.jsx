import React from 'react'
import { Outlet } from 'react-router-dom'

export default function BlankLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-black">
            <Outlet />
        </div>
    )
}
