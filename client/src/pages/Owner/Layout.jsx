import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../../components/Owner/Navbar'
import Sidebar from '../../components/Owner/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
    const { isOwner } = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (isOwner === false) {
            navigate('/')
        }
    }, [isOwner, navigate])

    return (
        <div className='flex flex-col min-h-screen'>
            <NavBar />

            <div className="flex flex-1">
                <Sidebar />

                <div className="flex-1 p-6 bg-gray-50">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout
