import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connetDB from "./config/db";
import roomRouter from "./routes/roomRoutes";
import bookingRouter from "./routes/bookingRoutes";

dotenv.config();
connetDB();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

export default app;