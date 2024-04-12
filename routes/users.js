import  express  from "express";
import { getUsers, setUsers,resetPass } from "../controllers/users.js";

const router = express.Router()

router.post("/getUsers",getUsers)
router.post("/setUsers",setUsers)
router.post("/resetPass",resetPass)

export default router