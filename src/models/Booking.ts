import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document{
    guestName: string;
    nights: number;
    checkInDate: Date;
    room: mongoose.Types.ObjectId;
};

const bookingSchema = new Schema<IBooking>({
    guestName: { type: String, required: true },
    nights: { type: Number, required: true },
    checkInDate: { type: Date, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, required: true }
});

export default mongoose.model<IBooking>("Booking", bookingSchema);