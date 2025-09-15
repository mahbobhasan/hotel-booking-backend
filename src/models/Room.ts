import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document{
    roomNo: number;
    type: string;
    beds: number;
    pricePerNight: number;
    description: Text;
    available: boolean;
};

const roomSchema = new Schema<IRoom>({
    roomNo: { type: Number, required: true, unique: true },
    type: { type: String, required: true },
    description:{type: String, required:true},
    beds: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    available: { type: Boolean, default: true }
});

export default mongoose.model<IRoom>("Room", roomSchema);