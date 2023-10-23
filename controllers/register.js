import {db} from "../db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req,res)=>{

    console.log("register from phone");
   
    
    const q = "SELECT * FROM users WHERE userName = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err){
            console.log("error 1st")
            return res.json(err)
        }
        console.log("register in middle of 1stquery " +data.length )
        if (data.length !== 0) {
            return res.status(409).json("UserName taken");
        }else {
            return res.status(200).json("succes");
            /*
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

                    return res.status(200).json("succes");
                    console.log("ending it ")
                };
            });
            */
        }
    });

    
};