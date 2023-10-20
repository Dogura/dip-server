import  express  from "express";
import { login, logout, loginPhone } from "../controllers/login.js";

const router = express.Router()

router.post("/login",login)
router.post("/logout",logout)
router.post("/loginPhone",loginPhone)

export default router