import React from 'react'
import { assets } from '../assets/assets'

const cities = [
    "BTM Layout",
    "HSR Layout",
    "koramangala",
    "madiwala",
]

const types = [
    "Mens PG",
    "Ladies PG",
    "CoLiving PG",
    "Hostel",
]


const HotelReg = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <form className="flex bg-white rounded-xl max-w-4xl max-md:mx-2 w-full">

                {/* Left Image */}
                <img
                    src={assets.regImage}
                    alt="reg-image"
                    className="w-1/2 rounded-l-xl hidden md:block object-cover"
                />

                {/* Right Form */}
                <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">

                    {/* Close Icon */}
                    <img
                        src={assets.closeIcon}
                        alt="close-icon"
                        className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
                    />

                    <p className="text-2xl font-semibold mt-6">
                        Register Your Property
                    </p>

                    {/* Hotel Name */}
                    <div className="w-full mt-4">
                        <label className="font-medium text-gray-500">
                            Hotel Name
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="w-full mt-4">
                        <label className="font-medium text-gray-500">
                            Address
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
                            required
                        />
                    </div>

                    {/* types */}
                    <div className="w-full mt-4 max-w-60 mr-auto">
                        <label className="font-medium text-gray-500">
                            Types
                        </label>
                        <select
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
                            required
                        >
                            <option value="">Select types</option>
                            {types.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* City */}
                    <div className="w-full mt-4 max-w-60 mr-auto">
                        <label className="font-medium text-gray-500">
                            City
                        </label>
                        <select
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
                            required
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded mt-6"
                    >
                        Register Hotel
                    </button>

                </div>
            </form>
        </div>
    )
}

export default HotelReg
