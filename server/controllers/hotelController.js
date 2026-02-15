import Hotel from "../models/Hotel.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

// Create Hotel
export const registerHotel = async (req, res) => {
    try {
        const ownerId = req.auth.userId;

        // Fetch Clerk user
        const clerkUser = await clerkClient.users.getUser(ownerId);

        const { name, address, city, state, pricePerNight, image } = req.body;

        // Validate required fields
        if (!name || !address || !city || !state || !pricePerNight || !image) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const hotel = await Hotel.create({
            name,
            address,
            city,
            state,
            pricePerNight,
            image,
            owner: ownerId,
            ownerEmail: clerkUser.emailAddresses[0].emailAddress,
            ownerName: clerkUser.firstName || clerkUser.username,
        });

        res.json({ success: true, message: "Hotel registered successfully", hotel });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Failed to register hotel" });
    }
};
