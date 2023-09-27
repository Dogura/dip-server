import  express  from "express";
import { getUsers, setUsers } from "../controllers/users.js";

const router = express.Router()

router.post("/getUsers",getUsers)
router.post("/setUsers",setUsers)

export default router