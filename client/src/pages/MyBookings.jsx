import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const MyBookings = () => {
    const { axios, getToken, user } = useAppContext()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchUserBooking = async () => {
        setLoading(true)
        setError(null)
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/bookings/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (data.success) {
                setBookings(data.bookings)
            } else {
                toast.error(data.message)
                setError(data.message)
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message
            toast.error(message)
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserBooking()
    }, [])

    if (loading) return <p className="text-center mt-10">Loading your bookings...</p>
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>
    if (bookings.length === 0) return <p className="text-center mt-10">No bookings found.</p>

    return (
        <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
            <Title
                title="Bookings History"
                subTitle="Easily manage your past, current, and upcoming PG and Hostel reservations in one place."
                align="center"
            />

            <div className="max-w-6xl mt-8 w-full mx-auto text-gray-800">
                {/* Header */}
                <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] border-b border-gray-300 font-medium py-3">
                    <div>Hotel Details</div>
                    <div>Date & Timings</div>
                    <div>Payment</div>
                </div>

                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] border-b border-gray-300 py-6 first:border-t"
                    >
                        {/* Hotel Details */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <img
                                src={booking.room?.images?.[0] || assets.defaultHotelImage}
                                alt="hotel"
                                className="md:w-44 rounded shadow object-cover"
                            />

                            <div className="flex flex-col gap-1.5">
                                <p className="font-playfair text-2xl">
                                    {booking.hotel?.name}
                                    <span className="font-inter text-sm ml-1">
                                        ({booking.room?.roomType})
                                    </span>
                                </p>

                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <img src={assets.guestsIcon} alt="guests" />
                                    <span>Guests: {booking.guests}</span>
                                </div>

                                <p className="text-base">Total: ₹{booking.totalPrice}</p>

                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <img src={assets.locationIcon} alt="location" />
                                    <span>{booking.hotel?.address}</span>
                                </div>
                            </div>
                        </div>

                        {/* Date & Timings */}
                        <div className="flex flex-col justify-center gap-3 mt-4 md:mt-0">
                            <div>
                                <p>Check-In:</p>
                                <p className="text-gray-500 text-sm">
                                    {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>

                            <div>
                                <p>Check-Out:</p>
                                <p className="text-gray-500 text-sm">
                                    {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Payment Status */}
                        <div className="flex flex-col justify-center pt-3">
                            <div className="flex items-center gap-2">
                                <div
                                    className={`h-3 w-3 rounded-full ${booking.isPaid ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                />
                                <p
                                    className={`text-sm ${booking.isPaid ? 'text-green-500' : 'text-red-500'
                                        }`}
                                >
                                    {booking.isPaid ? 'Paid' : 'Unpaid'}
                                </p>
                            </div>

                            {!booking.isPaid && (
                                <button className="px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition">
                                    Pay Now
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBookings
