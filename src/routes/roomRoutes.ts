import { getRooms, createRoom, updateRoom, deleteRoom,getRoomDetails } from './../controllers/roomController';

import express from "express";

const router = express.Router();
router.post("/", createRoom);
router.get("/", getRooms);
router.get("/:id", getRoomDetails);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export default router;