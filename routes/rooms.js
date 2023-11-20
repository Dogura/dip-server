import  express  from "express";
import {addRoom, getRooms, getRoomUsers, unmute, mute, kick } from "../controllers/rooms.js";
const router = express.Router()

router.post("/addRoom",addRoom)
router.post("/getRooms",getRooms)
router.post("/getRoomUsers",getRoomUsers)
router.post("/unmute",unmute)
router.post("/mute",mute)
router.post("/kick",kick)

export default router