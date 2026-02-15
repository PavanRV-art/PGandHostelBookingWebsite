import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    // _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ["user", "hostelOwner"], default: "user" },
    // recentSearchedCities: [{ type: String, required: true }],
    password: { type: String },
    googleId: { type: String },
    avatar: { type: String },
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    token: { type: String, default: null },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
}, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;