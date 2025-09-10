import React from 'react'
import Overview from './Overview'
import TaskInput from './TaskInput'

export default function SidebarUp() {
    return (
        <div className="flex flex-col gap-3 lg:[grid-area:sidebar1]">
            <Overview/>
            <TaskInput/>
        </div>
    )
}
