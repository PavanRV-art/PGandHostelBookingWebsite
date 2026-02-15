import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import transporter from "../configs/nodemailer.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

// Create Booking
export const createBooking = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { room, guests } = req.body;

        // Fetch Room
        const roomData = await Room.findById(room).populate("hotel");
        if (!roomData) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        const totalPrice = roomData.pricePerNight;

        // Create Booking
        const booking = await Booking.create({
            user: userId,
            room,
            hotel: roomData.hotel._id,
            // guests: Number(guests),
            totalPrice,
        });

        // Fetch Clerk user
        const clerkUser = await clerkClient.users.getUser(userId);

        // Send Email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: clerkUser.emailAddresses[0].emailAddress,
            subject: "Booking Details",
            html: `
        <h2>Your Booking Details</h2>
        <p>Dear ${clerkUser.firstName || clerkUser.username},</p>
        <p>Thank you for your booking! Here are your details:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${booking._id}</li>
          <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
          <li><strong>Location:</strong> ${roomData.hotel.address}</li>
          <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || '₹'} ${booking.totalPrice}</li>
        </ul>
        
        <p>We look forward to welcoming you!</p>
        <p>If you need to make any changes, feel free to contact us.</p>
      `,
        };

        await transporter.sendMail(mailOption);

        res.json({ success: true, message: "Booking created successfully", booking });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Failed to create booking" });
    }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.auth.userId;

        const bookings = await Booking.find({ user: userId })
            .populate("room hotel")
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Failed to fetch bookings" });
    }
};

export const stripePayment = async (req, res) => {
    try {
        const { bookingId } = req.body;

        // 1️⃣ Find booking
        const bookingData = await Booking.findById(bookingId);
        if (!bookingData) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        // 2️⃣ Create Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: bookingData.totalPrice * 100, // convert to paise
            currency: "inr",
            metadata: {
                bookingId: bookingData._id.toString(),
            },
        });

        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
