// server/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
        room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
        // guests: { type: Number, default: 1 },
        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
