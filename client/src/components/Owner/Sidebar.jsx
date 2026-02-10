import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {

    const sidebarLinks = [
        { name: 'Dashboard', path: '/owner', icon: assets.dashboardIcon, end: true },
        { name: 'Add Room', path: '/owner/add-room', icon: assets.addIcon },
        { name: 'List Room', path: '/owner/list-room', icon: assets.listIcon },
    ]

    return (
        <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-22 flex flex-col transition-all duration-300">
            {sidebarLinks.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.path}
                    end={item.end || false}
                    className={({ isActive }) =>
                        `flex items-center gap-3 py-3 px-4 md:px-8 transition-all ${isActive
                            ? 'border-r-4 md:border-r-[6px] border-blue-600 bg-blue-600/10 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100/90'
                        }`
                    }
                >
                    <img
                        src={item.icon}
                        alt={item.name}
                        className="min-w-6 min-h-6"
                    />

                    <p className="hidden md:block">
                        {item.name}
                    </p>
                </NavLink>
            ))}
        </div>
    )
}

export default Sidebar
