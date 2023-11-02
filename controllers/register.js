import {db} from "../db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    console.log("register from phone");

    const q = "SELECT * FROM users WHERE userName = ?";

    try {
        const data = await db.query(q, [req.body.username]);

        console.log("register in middle of 1st query " + data.length);

        if (data[0] !== undefined) {
            console.log(data[0])
            return res.status(409).json("UserName taken");
        } else {
            const pass = bcrypt.hashSync(req.body.password, 10);
            console.log("password hashed")

            const ins = "INSERT INTO users ( FirstName, Surname, Privileges, Password, userName) VALUES (?, ?, ?, ?, ?)"
            db.query(ins,[req.body.name,req.body.surrname,0,pass,req.body.username],(err,data)=>{
                if(err){
                    console.log("2nd error")
                    return res.status(422).json(err)
                }
                else {
                    console.log("ez put in to database")
                    return res.json({"message":"success"});

                };
            });
        }
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json(err);
    }

};