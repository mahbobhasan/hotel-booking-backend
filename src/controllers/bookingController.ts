import { Request, Response } from "express";
import Booking from "../models/Booking";
import Room from "../models/Room";

export const createBooking = async (req: Request, res: Response) => {
    try {
        const { guestName, roomId, nights, checkInDate } = req.body;
        console.log(req.body)
        console.log(roomId)
        const roomDoc = await Room.findById(roomId);
        // console.log(roomDoc);
        if (!roomDoc) {
            return res.status(404).json({error:"Room not found"})
        }
        else if (!roomDoc.available) {
            return res.status(400).json({error:"Room not available"})
        }
        const booking = new Booking({
            guestName,
            nights,
            checkInDate,
            room:roomDoc._id
        });
        await booking.save();
        roomDoc.available = false;
        await roomDoc.save();
        return res.status(201).json(booking)
    }
    catch (err: any) {
        console.error(err, "createbooking")
        return res.status(400).json(err)
    }
}

export const getBookingSummary = async (req: Request, res: Response) => {
    try {
        const summary = await Booking.aggregate([
            { $group: { _id: "$room", totalNights: { $sum: "$nights" }, bookings: { $sum: 1 } } },
            { $lookup: { from: "rooms", localField: "_id", foreignField: "_id", as: "roomDetails" } },
            { $unwind: "$roomDetails" },
            {$project:{roomNo:"$roomDetails.roomNo",type:"$roomDetails.type",totalNights:1,bookings:1}}
        ])
        if (!summary) {
            return res.status(404).json({error:"Summary not found"})
        }
        res.status(200).json(summary)
    }
    catch (err: any) {
        console.error(err, "getBookingSummary")
        res.status(400).json(err)
    }
}