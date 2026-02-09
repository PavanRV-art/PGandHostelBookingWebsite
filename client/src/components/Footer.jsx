import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className="bg-[#F6F9FC] flex flex-col md:flex-row gap-12 py-10 px-6 md:px-16 lg:px-24 border-b border-gray-500/30">

                {/* Left-side */}
                <div className="max-w-sm">
                    <img
                        src={assets.logo2}
                        alt="logo"
                        className="mb-4 h-14 md:h-20 lg:h-28 w-auto"
                    />
                    <p className="mt-6 text-sm text-gray-500">
                        Discover Bangalore's most extraordinary places to stay, from boutique PGs and hostels to premium long-term accommodations designed for comfort and convenience.
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                        <img src={assets.instagramIcon} alt="instagram" className="w-6 cursor-pointer" />
                        <img src={assets.facebookIcon} alt="facebook" className="w-6 cursor-pointer" />
                        <img src={assets.linkendinIcon} alt="linkedin" className="w-6 cursor-pointer" />
                        <img src={assets.twitterIcon} alt="twitter" className="w-6 cursor-pointer" />
                    </div>
                </div>

                {/* Right-side */}
                <div className="flex flex-1 flex-wrap md:flex-nowrap gap-16">

                    {/* Company */}
                    <div>
                        <h2 className="font-playfair text-gray-900 mb-5">COMPANY</h2>
                        <ul className="text-sm text-gray-500 space-y-2 list-none">
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Terms</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h2 className="font-playfair text-gray-900 mb-5">SUPPORT</h2>
                        <ul className="text-sm text-gray-500 space-y-2 list-none">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Safety Information</a></li>
                            <li><a href="#">Cancellation Options</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Extra Content */}
                    <div className="max-w-xs">
                        <h2 className="font-playfair text-gray-900 mb-5">STAY CONNECTED</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Subscribe to get updates on new PGs, hostels, and exclusive offers.
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-3 py-2 text-sm border border-gray-300 rounded-l-md w-full outline-none"
                            />
                            <button className="bg-black text-white px-4 text-sm rounded-r-md">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <p className="py-4 text-center text-xs md:text-sm text-gray-500">
                © 2024 StayBangalore. All Rights Reserved.
            </p>
        </div>
    )
}

export default Footer
