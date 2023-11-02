import {db} from "../db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    console.log("register from phone");

    const q = "SELECT * FROM users WHERE userName = ?";

    try {
        const data = await db.query(q, [req.body.username]);

        console.log("register in middle of 1st query " + data.length);

        if (data.length !== 0) {
            return res.status(409).json("UserName taken");
        } else {
            return res.status(200).json("success");
        }
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json(err);
    }
};