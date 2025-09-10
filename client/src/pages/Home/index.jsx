import React from 'react'
import SidebarUp from './components/SidebarUp'
import ListTask from './components/ListTask'
import ChartColumn from './components/ChartColumn'
import TopRank from './components/TopRank'
import CalenderTask from './components/CalenderTask'
import '../../index.css'
export default function Home() {
    return (
        <main className="min-h-screen bg-black flex justify-center pt-16">
            <div className="w-full px-4 md:px-8 py-4">
                <div
                    className="grid gap-4 md:gap-6 h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4
            lg:[grid-template-areas:'sidebar1_banner1_banner1_banner2''sidebar2_banner3_banner3_banner3']
            auto-rows-[1fr]
                    ">
                    <SidebarUp />
                    <ListTask />
                    <ChartColumn />
                    <TopRank />
                    <CalenderTask />
                </div>
            </div>
        </main>
    )
}
