import  express  from "express";
import { getRooms, getRoomUsers, unmute, mute, kick } from "../controllers/rooms.js";
const router = express.Router()

router.post("/getRooms",getRooms)
router.post("/getRoomUsers",getRoomUsers)
router.post("/unmute",unmute)
router.post("/mute",mute)
router.post("/kick",kick)

export default router