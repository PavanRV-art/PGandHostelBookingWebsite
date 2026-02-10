import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets, dashboardDummyData } from '../../assets/assets'

const Dashboard = () => {
    const [dashboardData] = useState(dashboardDummyData)

    return (
        <div className="mt-24">
            <Title
                align="left"
                font="outfit"
                title="Dashboard"
                subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
            />

            {/* -------- Stats Cards -------- */}
            <div className="flex flex-wrap justify-center gap-6 my-10">
                {/* Total Bookings */}
                <div className="bg-primary/3 border border-primary/10 rounded flex items-center p-6 pr-10">
                    <img
                        src={assets.totalBookingIcon}
                        alt=""
                        className="max-sm:hidden h-12"
                    />
                    <div className="flex flex-col sm:ml-6 font-medium">
                        <p className="text-blue-600 text-xl">Total Bookings</p>
                        <p className="text-neutral-500 text-2xl font-semibold">
                            {dashboardData.totalBookings}
                        </p>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-primary/3 border border-primary/10 rounded flex items-center p-6 pr-10">
                    <img
                        src={assets.totalRevenueIcon}
                        alt=""
                        className="max-sm:hidden h-12"
                    />
                    <div className="flex flex-col sm:ml-6 font-medium">
                        <p className="text-blue-600 text-xl">Total Revenue</p>
                        <p className="text-neutral-500 text-2xl font-semibold">
                            ₹{dashboardData.totalRevenue}
                        </p>
                    </div>
                </div>
            </div>

            {/* -------- Recent Bookings -------- */}
            <h2 className="text-2xl text-blue-950/80 font-semibold mb-6 text-center">
                Recent Bookings
            </h2>


            <div className="w-full max-w-5xl mx-auto border border-gray-300 rounded-xl max-h-[420px] overflow-y-auto">

                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-4 px-6 text-gray-800 text-lg font-semibold">
                                Owner's Name
                            </th>
                            <th className="py-4 px-6 text-gray-800 text-lg font-semibold max-sm:hidden">
                                Room Name
                            </th>
                            <th className="py-4 px-6 text-gray-800 text-lg font-semibold text-center">
                                Total Amount
                            </th>
                            <th className="py-4 px-6 text-gray-800 text-lg font-semibold text-center">
                                Payment Status
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-base">
                        {dashboardData.bookings.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-4 px-6 text-gray-700 border-t">
                                    {item.user.username}
                                </td>

                                <td className="py-4 px-6 text-gray-700 border-t max-sm:hidden">
                                    {item.room.roomType}
                                </td>

                                <td className="py-4 px-6 text-gray-700 border-t text-center">
                                    ₹{item.totalPrice}
                                </td>

                                <td className="py-4 px-6 border-t flex justify-center">
                                    <button
                                        className={`py-1.5 px-4 text-sm font-medium rounded-full
                                        ${item.isPaid
                                                ? 'bg-green-200 text-green-700'
                                                : 'bg-amber-200 text-yellow-700'
                                            }`}
                                    >
                                        {item.isPaid ? 'Completed' : 'Pending'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
