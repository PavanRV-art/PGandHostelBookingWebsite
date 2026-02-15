import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

    const { currency, user, getToken, axios } = useAppContext()

    const [dashboardData, setDashboardData] = useState({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0
    })

    const [loading, setLoading] = useState(true)

    const fetchDashboardData = async () => {
        try {
            setLoading(true)

            const token = await getToken()

            const { data } = await axios.get(
                '/api/bookings/hotel',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (data.success) {
                setDashboardData({
                    bookings: data.dashboardData?.bookings || [],
                    totalBookings: data.dashboardData?.totalBookings || 0,
                    totalRevenue: data.dashboardData?.totalRevenue || 0
                })
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            fetchDashboardData()
        }
    }, [user])

    if (loading) {
        return (
            <div className="mt-24 text-center text-lg font-medium">
                Loading Dashboard...
            </div>
        )
    }

    return (
        <div className="mt-24">
            <Title
                align="left"
                font="outfit"
                title="Dashboard"
                subTitle="Monitor your room listings, track bookings and analyze revenue."
            />

            {/* -------- Stats Cards -------- */}
            <div className="flex flex-wrap justify-center gap-6 my-10">

                {/* Total Bookings */}
                <div className="bg-primary/3 border border-primary/10 rounded flex items-center p-6 pr-10">
                    <img
                        src={assets.totalBookingIcon}
                        alt="Total Bookings"
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
                        alt="Total Revenue"
                        className="max-sm:hidden h-12"
                    />
                    <div className="flex flex-col sm:ml-6 font-medium">
                        <p className="text-blue-600 text-xl">Total Revenue</p>
                        <p className="text-neutral-500 text-2xl font-semibold">
                            {currency || "₹"}
                            {dashboardData.totalRevenue.toLocaleString()}
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
                                User Name
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
                        {dashboardData.bookings.length > 0 ? (
                            dashboardData.bookings.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">

                                    <td className="py-4 px-6 text-gray-700 border-t">
                                        {item.user?.username || "N/A"}
                                    </td>

                                    <td className="py-4 px-6 text-gray-700 border-t max-sm:hidden">
                                        {item.room?.roomType || "N/A"}
                                    </td>

                                    <td className="py-4 px-6 text-gray-700 border-t text-center">
                                        {currency || "₹"}
                                        {item.totalPrice?.toLocaleString()}
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
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-6 text-gray-500"
                                >
                                    No bookings found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Dashboard
