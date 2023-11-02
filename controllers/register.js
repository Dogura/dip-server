import {db} from "../db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export  const register = async (req,res)=>{

    const dbQuery = util.promisify(db.query);
    console.log("register from phone");
   

    const q = "SELECT * FROM users WHERE userName = ?";
    try {
        const data = await dbQuery(q, [req.body.username]);
        console.log("register in the middle of 1st query " + data.length);

        if (data.length !== 0) {
            return res.status(409).json("UserName taken");
        } else {
            const pass = bcrypt.hashSync(req.body.password, 10);
            console.log("password hashed");

            const ins = "INSERT INTO users (FirstName, Surname, Privileges, Password, userName) VALUES (?, ?, ?, ?, ?";

            try {
                await dbQuery(ins, [req.body.name, req.body.surrname, 0, pass, req.body.username]);
                console.log("Data inserted into the database");
                return res.status(200).json("success");
            } catch (err) {
                console.log("2nd error:", err);
                return res.status(422).json(err);
            }
        }
    } catch (err) {
        console.log("1st error:", err);
        return res.json(err);
    }

    
};