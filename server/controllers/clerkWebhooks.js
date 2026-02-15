import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // ✅ Verify webhook with raw body
        const payload = whook.verify(req.body, headers);

        const { data, type } = JSON.parse(req.body);

        const userData = {
            _id: data.id,
            email: data.email_addresses?.[0]?.email_address || "",
            username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            image: data.image_url || "",
        };

        switch (type) {
            case "user.created":
                await User.create(userData);
                break;

            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData, { new: true });
                break;

            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                break;

            default:
                console.log("Unhandled webhook type:", type);
        }

        return res.status(200).json({
            success: true,
            message: "Webhook Received",
        });

    } catch (error) {
        console.error("Webhook Error:", error.message);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export default clerkWebhooks;
