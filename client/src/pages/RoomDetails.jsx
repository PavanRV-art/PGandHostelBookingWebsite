import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    assets,
    facilityIcons,
    roomsDummyData,
    roomCommonData,
} from '../assets/assets';
import StarRating from '../components/starRating'

const RoomDetails = () => {
    const { id } = useParams()

    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState('')

    useEffect(() => {
        const foundRoom = roomsDummyData.find((r) => r._id === id)
        if (foundRoom) {
            setRoom(foundRoom)
            setMainImage(foundRoom.images[0])
        }
    }, [id])

    if (!room) return null

    return (
        <div className="py-28 px-4 md:px-16 lg:px-24 xl:px-32">
            {/* Title */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <h1 className="text-3xl md:text-4xl font-playfair">
                    {room.hotel.name}{' '}
                    {/* <span className="text-sm font-inter">({room.roomType})</span> */}
                </h1>

                <span className="text-xs py-1.5 px-3 text-white bg-orange-500 rounded-full">
                    20% OFF
                </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
            </div>

            {/* Address */}
            <div className="flex items-center gap-1 text-gray-500 mt-2">
                <img src={assets.locationIcon} alt="location" />
                <span>{room.hotel.address}</span>
            </div>

            {/* Images */}
            <div className="flex flex-col lg:flex-row mt-6 gap-6">
                <div className="lg:w-1/2 w-full">
                    <img
                        src={mainImage}
                        alt="Room"
                        className="w-full rounded-xl shadow-lg object-cover"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
                    {room.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="Room thumbnail"
                            onClick={() => setMainImage(img)}
                            className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === img
                                ? 'outline outline-2 outline-orange-500'
                                : ''
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-col md:flex-row justify-between mt-10 gap-6">
                <div>
                    <h2 className="text-3xl font-playfair">
                        Experience Like Never Before
                    </h2>

                    <div className="flex flex-wrap items-center mt-4 gap-4">
                        {room.amenities.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                            >
                                {facilityIcons[item] && (
                                    <img
                                        src={facilityIcons[item]}
                                        alt={item}
                                        className="w-5 h-5"
                                    />
                                )}
                                <p className="text-xs">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-2xl font-medium">
                    ₹{room.pricePerNight}
                </p>
            </div>

            {/* Booking Form */}
            <form className="flex flex-col md:flex-row justify-between gap-6 bg-white shadow-lg p-6 rounded-xl mt-16 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6 text-gray-500">
                    <div>
                        <label className="font-medium">Check-In</label>
                        <input
                            type="date"
                            className="border px-3 py-2 rounded mt-1 w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium">Check-Out</label>
                        <input
                            type="date"
                            className="border px-3 py-2 rounded mt-1 w-full"
                            required
                        />
                    </div>

                    {/* <div>
                        <label className="font-medium">Guests</label>
                        <input
                            type="number"
                            min="1"
                            className="border px-3 py-2 rounded mt-1 w-20"
                            required
                        />
                    </div> */}
                </div>

                <button
                    type="submit"
                    className="bg-primary text-white px-8 py-3 rounded hover:bg-primary-dull transition"
                >
                    Check Availability
                </button>
            </form>

            {/* Common Info */}
            <div className="mt-24 space-y-4">
                {roomCommonData.map((item, index) => (
                    <div key={index} className="flex gap-3">
                        <img src={item.icon} alt={item.title} className="w-6" />
                        <div>
                            <p>{item.title}</p>
                            <p className="text-gray-500">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Host */}
            <div className="flex items-center gap-4 mt-12">
                <img
                    src={room.hotel.owner.image}
                    alt="Host"
                    className="h-14 w-14 rounded-full"
                />
                <div>
                    <p className="text-lg">Hosted by {room.hotel.name}</p>
                    <div className="flex items-center">
                        <StarRating />
                        <p className="ml-2">200+ reviews</p>
                    </div>
                    <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>Contact Now</button>
                </div>

            </div>
        </div>
    )
}

export default RoomDetails
