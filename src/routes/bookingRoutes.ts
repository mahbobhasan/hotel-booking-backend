import express from "express";
import {createBooking,getBookingSummary} from "../controllers/bookingController"

const router = express.Router();
router.post("/", createBooking);
router.get("/summary/", getBookingSummary);

export default router