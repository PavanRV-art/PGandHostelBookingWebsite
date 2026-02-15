import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const cities = [
    "BTM Layout",
    "HSR Layout",
    "Koramangala",
    "Madiwala",
];

const types = [
    "Mens PG",
    "Ladies PG",
    "CoLiving PG",
    "Hostel",
];

const HotelReg = () => {
    const {
        setShowHotelReg,
        axios,
        getToken,
        setIsOwner,
    } = useAppContext();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const token = await getToken();

            const { data } = await axios.post(
                "/api/hotels",
                {
                    name,
                    address,
                    contact,
                    city,
                    type,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                toast.success("Hotel registered successfully");
                setIsOwner(true);
                setShowHotelReg(false);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            onClick={() => setShowHotelReg(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
            <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="flex bg-white rounded-xl max-w-4xl max-md:mx-2 w-full"
            >
                <img
                    src={assets.regImage}
                    alt="reg-image"
                    className="w-1/2 rounded-l-xl hidden md:block object-cover"
                />

                <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">

                    <img
                        src={assets.closeIcon}
                        alt="close-icon"
                        onClick={() => setShowHotelReg(false)}
                        className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
                    />

                    <p className="text-2xl font-semibold mt-6">
                        Register Your Property
                    </p>

                    <div className="w-full mt-4">
                        <label className="font-medium text-gray-500">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500"
                            required
                        />
                    </div>

                    <div className="w-full mt-4">
                        <label className="font-medium text-gray-500">Phone</label>
                        <input
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            type="tel"
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500"
                            required
                        />
                    </div>

                    <div className="w-full mt-4">
                        <label className="font-medium text-gray-500">Address</label>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500"
                            required
                        />
                    </div>

                    <div className="w-full mt-4 max-w-60 mr-auto">
                        <label className="font-medium text-gray-500">Types</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500"
                            required
                        >
                            <option value="">Select type</option>
                            {types.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full mt-4 max-w-60 mr-auto">
                        <label className="font-medium text-gray-500">City</label>
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500"
                            required
                        >
                            <option value="">Select City</option>
                            {cities.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded mt-6 disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Register Hotel"}
                    </button>

                </div>
            </form>
        </div>
    );
};

export default HotelReg;
