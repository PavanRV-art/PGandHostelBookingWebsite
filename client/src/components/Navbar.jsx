import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
    <svg
        className="w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v12m-7-9h14M5 6h14v12H5z"
        />
    </svg>
);

const Navbar = () => {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "PG", path: "/rooms" },
        { name: "Hostel", path: "/hostel" },
        { name: "About", path: "/about" },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { openSignIn } = useClerk();
    const location = useLocation();

    // ✅ FIXED: Added ()
    const { user, navigate, isOwner, setShowHotelReg } = useAppContext();

    // Scroll effect
    useEffect(() => {
        if (location.pathname !== "/") {
            setIsScrolled(true);
            return;
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
        <nav
            className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled
                ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
                : "py-4 md:py-6"
                }`}
        >
            {/* Logo */}
            <Link to="/">
                <img
                    src={assets.logo}
                    alt="logo"
                    className={`w-40 h-auto object-contain ${isScrolled ? "invert opacity-80" : ""
                        }`}
                />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        className={`group flex flex-col gap-0.5 font-semibold ${isScrolled ? "text-gray-700" : "text-white"
                            } text-lg lg:text-xl`}
                    >
                        {link.name}
                        <span
                            className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${isScrolled ? "bg-gray-700" : "bg-white"
                                }`}
                        />
                    </Link>
                ))}

                {user && (
                    <button
                        className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? "text-black" : "text-white"
                            } transition-all`}
                        onClick={() =>
                            isOwner ? navigate("/owner") : setShowHotelReg(true)
                        }
                    >
                        {isOwner ? "Dashboard" : "List your Hotel"}
                    </button>
                )}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4">
                <img
                    src={assets.searchIcon}
                    alt="search"
                    className={`${isScrolled ? "invert" : ""} h-7 transition-all duration-500`}
                />

                {user ? (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action
                                label="Booking History"
                                labelIcon={<BookIcon />}
                                onClick={() => navigate("/my-bookings")}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                ) : (
                    <button
                        onClick={openSignIn}
                        className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled
                            ? "text-white bg-black"
                            : "bg-white text-black"
                            }`}
                    >
                        Login
                    </button>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="text-2xl"
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen
                    ? "translate-x-0 pointer-events-auto"
                    : "-translate-x-full pointer-events-none"
                    }`}
            >
                <button
                    className="absolute top-4 right-4 text-2xl"
                    onClick={() => setIsMenuOpen(false)}
                >
                    ✕
                </button>

                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg"
                    >
                        {link.name}
                    </Link>
                ))}

                {user && (
                    <button
                        className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer text-black"
                        onClick={() =>
                            isOwner ? navigate("/owner") : setShowHotelReg(true)
                        }
                    >
                        {isOwner ? "Dashboard" : "List your Hotel"}
                    </button>
                )}

                {!user && (
                    <button
                        onClick={openSignIn}
                        className="px-8 py-2.5 rounded-full bg-black text-white"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
