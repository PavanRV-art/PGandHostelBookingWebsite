import React, { useState } from 'react'
import { roomsDummyData } from '../../assets/assets'
import Title from '../../components/Title'

const ListRoom = () => {

    const [rooms] = useState(roomsDummyData)

    return (
        <div className="flex flex-col-reverse lg:flex-row items-start justify-between
        pt-28 md:pt-36 px-4 md:px-16 lg:px-24 xl:px-32">

            <div className="w-full">
                <Title
                    align="left"
                    font="outfit"
                    title="Room Listings"
                    subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
                />

                <p className="text-lg text-gray-500 mt-10">
                    All Rooms
                </p>

                <div className="w-full max-w-4xl text-left border border-gray-300 rounded-xl max-h-[420px] overflow-y-auto mt-5">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-4 px-6 text-gray-800 text-lg font-semibold">
                                    Name
                                </th>
                                <th className="py-4 px-6 text-gray-800 text-lg font-semibold max-sm:hidden">
                                    Facility
                                </th>
                                <th className="py-4 px-6 text-gray-800 text-lg font-semibold">
                                    Price
                                </th>
                                <th className="py-4 px-6 text-gray-800 text-lg font-semibold text-center">
                                    Availability
                                </th>
                            </tr>
                        </thead>

                        <tbody className="text-base">
                            {rooms.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 text-gray-700 border-t">
                                        {item.roomType}
                                    </td>

                                    <td className="py-4 px-6 text-gray-700 border-t max-sm:hidden">
                                        {item.amenities.join(', ')}
                                    </td>

                                    <td className="py-4 px-6 text-gray-700 border-t font-medium">
                                        ₹{item.pricePerNight}
                                    </td>

                                    <td className="py-4 px-6 border-t text-center">
                                        <label className="relative inline-flex items-center cursor-pointer gap-3">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={item.isAvailable}
                                                readOnly
                                            />
                                            <div className="w-14 h-8 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                            <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-6"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListRoom
