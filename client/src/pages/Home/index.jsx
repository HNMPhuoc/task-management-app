import React, { useEffect } from 'react'
import ListTask from './components/ListTask'
import ChartColumn from './components/ChartColumn'
import TopRank from './components/TopRank'
import CalenderTask from './components/CalenderTask'
import Overview from './components/Overview'
import TaskInput from './components/TaskInput'

export default function Home({ title }) {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);
    
    return (
        <main className="min-h-screen bg-black flex justify-center pt-16">
            <div className="w-full px-4 md:px-8 py-4">
                <div
                    className="grid gap-4 md:gap-6 h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4
            lg:[grid-template-areas:'sidebar1_banner1_banner1_banner2''sidebar2_banner3_banner3_banner3']
            auto-rows-[1fr]
                    ">
                    <div className="flex flex-col gap-3 lg:[grid-area:sidebar1]">
                        <Overview />
                        <TaskInput />
                    </div>
                    <ListTask />
                    <ChartColumn />
                    <TopRank />
                    <CalenderTask />
                </div>
            </div>
        </main>
    )
}
