import React, { useState } from 'react'
import {
    assets, facilityIcons, hostelroomsDummyData,
    hostel2roomsDummyData, hostel3roomsDummyData,
    hostel4roomsDummyData, hostel5roomsDummyData
} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'

/* ---------- Checkbox Component ---------- */
const CheckBox = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
            <input
                type="checkbox"
                checked={selected}
                onChange={(e) => onChange(e.target.checked, label)}
            />
            <span className="font-light select-none">{label}</span>
        </label>
    )
}

/* ---------- Radio Button Component ---------- */
const RadioButton = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
            <input
                type="radio"
                name="sortOption"
                checked={selected}
                onChange={() => onChange(label)}
            />
            <span className="font-light select-none">{label}</span>
        </label>
    )
}

/* ---------- Main Component ---------- */
const HostelRooms = () => {
    const navigate = useNavigate()
    const [openFilters, setOpenFilters] = useState(false)

    const [selectedRoomTypes, setSelectedRoomTypes] = useState([])
    const [selectedPrices, setSelectedPrices] = useState([])
    const [selectedSort, setSelectedSort] = useState('')


    const roomTypes = [
        'Single Bed',
        'Double Bed',
        'Luxury Room',
    ]

    const priceRanges = [
        '0 to 5000',
        '5000 to 10000',
        '15000 to 20000',
        '25000 to 30000',
    ]

    const sortOptions = [
        'Price Low to High',
        'Price High to Low',
        'Newest First',
    ]


    const applyFilters = (room) => {

        // Filter by Room Type
        if (selectedRoomTypes.length > 0 &&
            !selectedRoomTypes.includes(room.roomType)) {
            return false
        }

        // Filter by Price
        if (selectedPrices.length > 0) {
            const matchPrice = selectedPrices.some(range => {
                const [min, max] = range.split(' to ').map(Number)
                return room.pricePerNight >= min && room.pricePerNight <= max
            })

            if (!matchPrice) return false
        }

        return true
    }

    const clearFilters = () => {
        setSelectedRoomTypes([])
        setSelectedPrices([])
        setSelectedSort('')
    }


    return (

        <div
            className="flex flex-col-reverse lg:flex-row items-start justify-between
                pt-28 md:pt-36 px-4 md:px-16 lg:px-24 xl:px-32">
            {/* ---------- Rooms Section ---------- */}
            < div className="flex-1" >
                <div className="flex flex-col items-start text-left mb-6">
                    <div className="mb-6">
                        <h1 className="font-playfair text-4xl md:text-[40px]">
                            Hostel Rooms
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 mt-2 max-w-xl">
                            Discover comfortable, affordable rooms designed for students and travelers. Enjoy modern amenities, flexible stays, and a hassle-free booking experience.
                        </p>
                    </div>
                    <div className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-md w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#6B7280">
                            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
                        </svg>
                        <input type="text" className="w-full h-full outline-none text-sm text-gray-500" />
                        <button type="submit" className="bg-indigo-500 w-32 h-9 rounded-full text-sm text-white mr-[5px]">Search</button>
                    </div>
                </div>
                {/* --------hostel 1 */}
                {
                    hostelroomsDummyData
                        .slice()
                        .sort((a, b) => {
                            if (selectedSort === "Price Low to High") {
                                return a.pricePerNight - b.pricePerNight
                            }
                            if (selectedSort === "Price High to Low") {
                                return b.pricePerNight - a.pricePerNight
                            }
                            if (selectedSort === "Newest First") {
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            }
                            return 0
                        })
                        .filter(applyFilters)
                        .map((room) => (

                            <div
                                key={room._id}
                                className="flex flex-col md:flex-row items-start py-10 gap-6
            border-b border-gray-300 last:border-0"
                            >
                                <img
                                    onClick={() => {
                                        navigate(`/rooms/${room._id}`)
                                        window.scrollTo(0, 0)
                                    }}
                                    src={room.images[0]}
                                    alt="hotel"
                                    title="View room details"
                                    className="max-h-64 md:w-1/2 rounded-xl shadow-lg
              object-cover cursor-pointer"
                                />

                                <div className="md:w-1/2 flex flex-col gap-2">
                                    <p className="text-gray-500">{room.hotel.city}</p>

                                    <p
                                        onClick={() => {
                                            navigate(`/rooms/${room._id}`)
                                            window.scrollTo(0, 0)
                                        }}
                                        className="text-gray-800 text-3xl font-playfair cursor-pointer"
                                    >
                                        {room.hotel.name}
                                    </p>

                                    <div className="flex items-center">
                                        <StarRating />
                                        <p className="ml-2 text-sm">200+ reviews</p>
                                    </div>

                                    <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                                        <img
                                            src={assets.locationIcon}
                                            alt="location"
                                            className="w-4 h-4"
                                        />
                                        <span>{room.hotel.address}</span>
                                    </div>

                                    {/* Amenities */}
                                    <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                                        {room.amenities.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 px-3 py-2
                    rounded-lg bg-[#F5F5FF]/70"
                                            >
                                                <img
                                                    src={facilityIcons[item]}
                                                    alt={item}
                                                    className="w-5 h-5"
                                                />
                                                <p className="text-xs">{item}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-xl font-medium text-gray-700">
                                        ₹{room.pricePerNight}
                                    </p>
                                </div>
                            </div>
                        ))
                }


                {/* --------hostel2- */}
                {
                    hostel2roomsDummyData
                        .slice()
                        .sort((a, b) => {
                            if (selectedSort === "Price Low to High") {
                                return a.pricePerNight - b.pricePerNight
                            }
                            if (selectedSort === "Price High to Low") {
                                return b.pricePerNight - a.pricePerNight
                            }
                            if (selectedSort === "Newest First") {
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            }
                            return 0
                        })
                        .filter(applyFilters)
                        .map((room) => (

                            <div
                                key={room._id}
                                className="flex flex-col md:flex-row items-start py-10 gap-6
            border-b border-gray-300 last:border-0"
                            >
                                <img
                                    onClick={() => {
                                        navigate(`/rooms/${room._id}`)
                                        window.scrollTo(0, 0)
                                    }}
                                    src={room.images[0]}
                                    alt="hotel"
                                    title="View room details"
                                    className="max-h-64 md:w-1/2 rounded-xl shadow-lg
              object-cover cursor-pointer"
                                />

                                <div className="md:w-1/2 flex flex-col gap-2">
                                    <p className="text-gray-500">{room.hotel.city}</p>

                                    <p
                                        onClick={() => {
                                            navigate(`/rooms/${room._id}`)
                                            window.scrollTo(0, 0)
                                        }}
                                        className="text-gray-800 text-3xl font-playfair cursor-pointer"
                                    >
                                        {room.hotel.name}
                                    </p>

                                    <div className="flex items-center">
                                        <StarRating />
                                        <p className="ml-2 text-sm">200+ reviews</p>
                                    </div>

                                    <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                                        <img
                                            src={assets.locationIcon}
                                            alt="location"
                                            className="w-4 h-4"
                                        />
                                        <span>{room.hotel.address}</span>
                                    </div>

                                    {/* Amenities */}
                                    <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                                        {room.amenities.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 px-3 py-2
                    rounded-lg bg-[#F5F5FF]/70"
                                            >
                                                <img
                                                    src={facilityIcons[item]}
                                                    alt={item}
                                                    className="w-5 h-5"
                                                />
                                                <p className="text-xs">{item}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-xl font-medium text-gray-700">
                                        ₹{room.pricePerNight}
                                    </p>
                                </div>
                            </div>
                        ))
                }

                {/* --------- hostel 3 */}
                {
                    hostel3roomsDummyData
                        .slice()
                        .sort((a, b) => {
                            if (selectedSort === "Price Low to High") {
                                return a.pricePerNight - b.pricePerNight
                            }
                            if (selectedSort === "Price High to Low") {
                                return b.pricePerNight - a.pricePerNight
                            }
                            if (selectedSort === "Newest First") {
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            }
                            return 0
                        })
                        .filter(applyFilters)
                        .map((room) => (

                            <div
                                key={room._id}
                                className="flex flex-col md:flex-row items-start py-10 gap-6
            border-b border-gray-300 last:border-0"
                            >
                                <img
                                    onClick={() => {
                                        navigate(`/rooms/${room._id}`)
                                        window.scrollTo(0, 0)
                                    }}
                                    src={room.images[0]}
                                    alt="hotel"
                                    title="View room details"
                                    className="max-h-64 md:w-1/2 rounded-xl shadow-lg
              object-cover cursor-pointer"
                                />

                                <div className="md:w-1/2 flex flex-col gap-2">
                                    <p className="text-gray-500">{room.hotel.city}</p>

                                    <p
                                        onClick={() => {
                                            navigate(`/rooms/${room._id}`)
                                            window.scrollTo(0, 0)
                                        }}
                                        className="text-gray-800 text-3xl font-playfair cursor-pointer"
                                    >
                                        {room.hotel.name}
                                    </p>

                                    <div className="flex items-center">
                                        <StarRating />
                                        <p className="ml-2 text-sm">200+ reviews</p>
                                    </div>

                                    <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                                        <img
                                            src={assets.locationIcon}
                                            alt="location"
                                            className="w-4 h-4"
                                        />
                                        <span>{room.hotel.address}</span>
                                    </div>

                                    {/* Amenities */}
                                    <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                                        {room.amenities.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 px-3 py-2
                    rounded-lg bg-[#F5F5FF]/70"
                                            >
                                                <img
                                                    src={facilityIcons[item]}
                                                    alt={item}
                                                    className="w-5 h-5"
                                                />
                                                <p className="text-xs">{item}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-xl font-medium text-gray-700">
                                        ₹{room.pricePerNight}
                                    </p>
                                </div>
                            </div>
                        ))
                }

                {/* --------- hostel 4 */}
                {
                    hostel4roomsDummyData
                        .slice()
                        .sort((a, b) => {
                            if (selectedSort === "Price Low to High") {
                                return a.pricePerNight - b.pricePerNight
                            }
                            if (selectedSort === "Price High to Low") {
                                return b.pricePerNight - a.pricePerNight
                            }
                            if (selectedSort === "Newest First") {
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            }
                            return 0
                        })
                        .filter(applyFilters)
                        .map((room) => (

                            <div
                                key={room._id}
                                className="flex flex-col md:flex-row items-start py-10 gap-6
            border-b border-gray-300 last:border-0"
                            >
                                <img
                                    onClick={() => {
                                        navigate(`/rooms/${room._id}`)
                                        window.scrollTo(0, 0)
                                    }}
                                    src={room.images[0]}
                                    alt="hotel"
                                    title="View room details"
                                    className="max-h-64 md:w-1/2 rounded-xl shadow-lg
              object-cover cursor-pointer"
                                />

                                <div className="md:w-1/2 flex flex-col gap-2">
                                    <p className="text-gray-500">{room.hotel.city}</p>

                                    <p
                                        onClick={() => {
                                            navigate(`/rooms/${room._id}`)
                                            window.scrollTo(0, 0)
                                        }}
                                        className="text-gray-800 text-3xl font-playfair cursor-pointer"
                                    >
                                        {room.hotel.name}
                                    </p>

                                    <div className="flex items-center">
                                        <StarRating />
                                        <p className="ml-2 text-sm">200+ reviews</p>
                                    </div>

                                    <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                                        <img
                                            src={assets.locationIcon}
                                            alt="location"
                                            className="w-4 h-4"
                                        />
                                        <span>{room.hotel.address}</span>
                                    </div>

                                    {/* Amenities */}
                                    <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                                        {room.amenities.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 px-3 py-2
                    rounded-lg bg-[#F5F5FF]/70"
                                            >
                                                <img
                                                    src={facilityIcons[item]}
                                                    alt={item}
                                                    className="w-5 h-5"
                                                />
                                                <p className="text-xs">{item}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-xl font-medium text-gray-700">
                                        ₹{room.pricePerNight}
                                    </p>
                                </div>
                            </div>
                        ))
                }
                {/* --------- hostel 5 */}
                {
                    hostel5roomsDummyData
                        .slice()
                        .sort((a, b) => {
                            if (selectedSort === "Price Low to High") {
                                return a.pricePerNight - b.pricePerNight
                            }
                            if (selectedSort === "Price High to Low") {
                                return b.pricePerNight - a.pricePerNight
                            }
                            if (selectedSort === "Newest First") {
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            }
                            return 0
                        })
                        .filter(applyFilters)
                        .map((room) => (

                            <div
                                key={room._id}
                                className="flex flex-col md:flex-row items-start py-10 gap-6
            border-b border-gray-300 last:border-0"
                            >
                                <img
                                    onClick={() => {
                                        navigate(`/rooms/${room._id}`)
                                        window.scrollTo(0, 0)
                                    }}
                                    src={room.images[0]}
                                    alt="hotel"
                                    title="View room details"
                                    className="max-h-64 md:w-1/2 rounded-xl shadow-lg
              object-cover cursor-pointer"
                                />

                                <div className="md:w-1/2 flex flex-col gap-2">
                                    <p className="text-gray-500">{room.hotel.city}</p>

                                    <p
                                        onClick={() => {
                                            navigate(`/rooms/${room._id}`)
                                            window.scrollTo(0, 0)
                                        }}
                                        className="text-gray-800 text-3xl font-playfair cursor-pointer"
                                    >
                                        {room.hotel.name}
                                    </p>

                                    <div className="flex items-center">
                                        <StarRating />
                                        <p className="ml-2 text-sm">200+ reviews</p>
                                    </div>

                                    <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                                        <img
                                            src={assets.locationIcon}
                                            alt="location"
                                            className="w-4 h-4"
                                        />
                                        <span>{room.hotel.address}</span>
                                    </div>

                                    {/* Amenities */}
                                    <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                                        {room.amenities.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 px-3 py-2
                    rounded-lg bg-[#F5F5FF]/70"
                                            >
                                                <img
                                                    src={facilityIcons[item]}
                                                    alt={item}
                                                    className="w-5 h-5"
                                                />
                                                <p className="text-xs">{item}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-xl font-medium text-gray-700">
                                        ₹{room.pricePerNight}
                                    </p>
                                </div>
                            </div>
                        ))
                }
            </div >

            {/* --------------------------------------------------------------------------------- */}
            {/* ---------- Filters Section ---------- */}
            < div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 lg:mt-16"
            >
                <div
                    className={`flex items-center justify-between px-5 py-2.5
          border-gray-300 ${openFilters ? 'border-b' : ''}`}
                >
                    <p className="text-base font-medium text-gray-800">FILTERS</p>

                    <div className="text-xs cursor-pointer">
                        <span
                            onClick={() => setOpenFilters(!openFilters)}
                            className="lg:hidden"
                        >
                            {openFilters ? 'HIDE' : 'SHOW'}
                        </span>
                        <span
                            onClick={clearFilters}
                            className="hidden lg:block cursor-pointer"
                        >
                            CLEAR
                        </span>

                    </div>
                </div>

                <div
                    className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'
                        } overflow-hidden transition-all duration-700`}
                >
                    <div className="px-5 pt-5">
                        <p className="font-medium text-gray-800 pb-2">
                            Popular Filters
                        </p>
                        {roomTypes.map((room, index) => (<CheckBox key={index} label={room} selected={selectedRoomTypes.includes(room)} onChange={() => { setSelectedRoomTypes(prev => prev.includes(room) ? prev.filter(item => item !== room) : [...prev, room]) }} />))}

                    </div>

                    <div className="px-5 pt-5">
                        <p className="font-medium text-gray-800 pb-2">
                            Price Ranges
                        </p>
                        {priceRanges.map((range, index) => (<CheckBox key={index} label={`₹ ${range}`} selected={selectedPrices.includes(range)} onChange={() => { setSelectedPrices(prev => prev.includes(range) ? prev.filter(item => item !== range) : [...prev, range]) }} />))}
                    </div>

                    <div className="px-5 pt-5 pb-7">
                        <p className="font-medium text-gray-800 pb-2">
                            Sort By
                        </p>
                        {sortOptions.map((option, index) => (<RadioButton key={index} label={option} selected={selectedSort === option} onChange={() => setSelectedSort(option)} />))}
                    </div>
                </div>
            </div>
        </div >

    )
}

export default HostelRooms
