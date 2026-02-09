import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Owner/Navbar'
import Sidebar from '../../components/Owner/Sidebar'

const Layout = () => {
    return (
        <div className="h-screen flex flex-col">

            {/* Top Navbar */}
            <Navbar />

            {/* Main Area */}
            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar */}
                <Sidebar />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 pt-10 md:px-10">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

export default Layout

