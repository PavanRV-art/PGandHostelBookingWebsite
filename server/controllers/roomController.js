import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";

// API to create a new room
export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body;

        const hotel = await Hotel.findOne({ owner: req.user._id });
        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "No hotel found for this owner"
            });
        }

        // Upload images to Cloudinary
        const uploadImages = req.files.map(file =>
            cloudinary.uploader.upload(file.path)
        );

        const uploadedImages = await Promise.all(uploadImages);
        const images = uploadedImages.map(item => item.secure_url);

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: Number(pricePerNight),
            amenities: JSON.parse(amenities),
            images,
        });

        res.status(201).json({
            success: true,
            message: "Room created successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// API to get all available rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true })
            .populate({
                path: "hotel",
                populate: {
                    path: "owner",
                    select: "image"
                }
            })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            rooms
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// API to get rooms of logged-in owner
export const getOwnerRooms = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.user._id });

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        const rooms = await Room.find({ hotel: hotel._id })
            .populate("hotel");

        res.json({
            success: true,
            rooms
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// API to toggle room availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;

        const roomData = await Room.findById(roomId);

        if (!roomData) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();

        res.json({
            success: true,
            message: "Room availability updated",
            isAvailable: roomData.isAvailable
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

