import express from "express";
import { createBooking, getUserBookings } from "../controllers/bookingController.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";

const bookingRouter = express.Router();

bookingRouter.use(clerkMiddleware());

bookingRouter.post("/book", requireAuth(), createBooking);
bookingRouter.get("/user", requireAuth(), getUserBookings);

export default bookingRouter;
