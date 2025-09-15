
import { Request, Response } from "express";
import Room from "../models/Room";
import { error } from "console";

export const createRoom = async (req: Request, res: Response) => {
    try {
        const {roomNo}=req.body
        const existingRoom = await Room.findOne({ roomNo });

        if (existingRoom) {
        return res.status(400).json({ error: "Room number already exists" });
        }
        const room = new Room(req.body);
        await room.save();
        res.status(201).json(room)
    }
    catch (err: any) {
        res.status(400).json({ "error": err });
    }
}

export const getRooms = async (req: Request, res: Response) => {
    try {
        const page: number= parseInt(req.query.page as string) || 1
        const limit: number = 6;
        const skip :number= (page - 1)*limit;
        const rooms = await Room.find().skip(skip).limit(limit);
        const total: number = await Room.countDocuments();
        
        res.status(200).json({
            totalPages: Math.ceil(total / limit),
            rooms
        });

    }
    catch (err:any) {
        console.error(err,"getrooms")
        res.status(400).json({"error":err})
    }
}
export const getRoomDetails = async (req: Request, res: Response) => {
    try {
        const room = await Room.findById(req.params.id);
        console.log(room)
        if (!room) {
            return res.status(404).json({error:"Room not found"})
        }
        res.status(200).json(room)
    }
    catch (err: any) {
        console.error(err, "getRoomDetails")
        res.status(400).json(err)
    }
};
export const updateRoom = async (req: Request, res: Response)=> {
    try {
        
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!room) return res.status(404).json({ "error": "Room not found" })
        res.json(room);
    }
    catch (err) {
        console.error(err,"updateroom")
        res.status(400).json({"error":err})
    }
}
export const deleteRoom = async (req: Request, res: Response) => {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
        return res.status(404).json({"error":"Room not found"})
    }
    res.status(200).json({ message: "Room deleted successfully" });
}