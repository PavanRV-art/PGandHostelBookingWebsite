import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const { userId } = req.auth();

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated",
            });
        }

        // ✅ Find user using clerkId (NOT _id)
        let user = await User.findOne({ clerkId: userId });

        // If user does not exist, create one
        if (!user) {
            user = await User.create({
                clerkId: userId,
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("PROTECT ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
