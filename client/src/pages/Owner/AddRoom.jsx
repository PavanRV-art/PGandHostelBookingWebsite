import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddRoom = () => {

    const { axios, getToken } = useAppContext()

    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null
    })

    const [inputs, setInputs] = useState({
        roomType: '',
        pricePerNight: '',
        amenities: {
            'Free WiFi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false
        }
    })

    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (
            !inputs.roomType ||
            !inputs.pricePerNight ||
            !Object.values(images).some(image => image)
        ) {
            toast.error("Please fill in all the details")
            return
        }

        setLoading(true)

        try {
            const formData = new FormData()

            formData.append('roomType', inputs.roomType)
            formData.append('pricePerNight', inputs.pricePerNight)

            const selectedAmenities = Object.keys(inputs.amenities)
                .filter(key => inputs.amenities[key])

            formData.append('amenities', JSON.stringify(selectedAmenities))

            Object.keys(images).forEach((key) => {
                if (images[key]) {
                    formData.append('images', images[key])
                }
            })

            const token = await getToken()

            const { data } = await axios.post(
                '/api/rooms',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            if (data.success) {
                toast.success(data.message)

                setInputs({
                    roomType: '',
                    pricePerNight: '',
                    amenities: {
                        'Free WiFi': false,
                        'Free Breakfast': false,
                        'Room Service': false,
                        'Mountain View': false,
                        'Pool Access': false
                    }
                })

                setImages({ 1: null, 2: null, 3: null, 4: null })

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col-reverse lg:flex-row items-start justify-between
        pt-28 md:pt-36 px-4 md:px-16 lg:px-24 xl:px-32">

            <form onSubmit={onSubmitHandler} className="w-full max-w-2xl">

                <Title
                    align="left"
                    font="outfit"
                    title="Add Room"
                    subTitle="Fill in the details carefully and accurate room details, pricing, and amenities."
                />

                {/* Images */}
                <p className="text-lg font-medium text-gray-800 mt-10">Images</p>

                <div className="grid grid-cols-2 sm:flex gap-6 my-4 flex-wrap">
                    {Object.keys(images).map((key) => (
                        <label htmlFor={`roomImage${key}`} key={key}>
                            <img
                                className="h-20 cursor-pointer opacity-80 hover:opacity-100 transition"
                                src={
                                    images[key]
                                        ? URL.createObjectURL(images[key])
                                        : assets.uploadArea
                                }
                                alt=""
                            />
                            <input
                                type="file"
                                accept="image/*"
                                id={`roomImage${key}`}
                                hidden
                                onChange={(e) =>
                                    setImages({
                                        ...images,
                                        [key]: e.target.files[0]
                                    })
                                }
                            />
                        </label>
                    ))}
                </div>

                {/* Type & Price */}
                <div className="w-full flex max-sm:flex-col sm:gap-6 mt-6">

                    <div className="flex-1 max-w-56">
                        <p className="text-lg font-medium text-gray-800">Types</p>

                        <select
                            value={inputs.roomType}
                            onChange={(e) =>
                                setInputs({ ...inputs, roomType: e.target.value })
                            }
                            className="border border-gray-300 mt-2 rounded p-3 w-full text-base"
                        >
                            <option value="">Select Type</option>
                            <option value="Mens PG">Mens PG</option>
                            <option value="Ladies PG">Ladies PG</option>
                            <option value="CoLiving PG">CoLiving PG</option>
                            <option value="Hostel">Hostel</option>
                        </select>
                    </div>

                    <div>
                        <p className="text-lg font-medium text-gray-800">Price</p>
                        <input
                            type="number"
                            className="border border-gray-300 mt-2 rounded p-3 w-32 text-base"
                            value={inputs.pricePerNight}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    pricePerNight: e.target.value
                                })
                            }
                        />
                    </div>

                </div>

                {/* Amenities */}
                <p className="text-lg font-medium text-gray-800 mt-8">Amenities</p>

                <div className="flex flex-col gap-3 mt-3 text-gray-600 max-w-sm text-base">
                    {Object.keys(inputs.amenities).map((amenity, index) => (
                        <label
                            key={index}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={inputs.amenities[amenity]}
                                onChange={() =>
                                    setInputs({
                                        ...inputs,
                                        amenities: {
                                            ...inputs.amenities,
                                            [amenity]:
                                                !inputs.amenities[amenity]
                                        }
                                    })
                                }
                                className="w-4 h-4"
                            />
                            {amenity}
                        </label>
                    ))}
                </div>

                <button
                    disabled={loading}
                    className="bg-primary text-white px-10 py-3 rounded mt-10 text-lg font-medium hover:bg-primary-dull transition"

                >
                    {loading ? "Adding..." : "Add Room"}
                </button>

            </form>
        </div>
    )
}

export default AddRoom
