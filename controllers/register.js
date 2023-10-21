import {db} from "../db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req,res)=>{

    console.log("register from phone");
   
    
    const q = "SELECT * FROM users WHERE userName = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err){
            return res.json(err)
        }
        if (data.length != 0) return res.status(404).json("UserName taken");
    });

    const pass = bcrypt.hashSync(req.body.password, 10);

    const ins = "INSERT INTO users ( FirstName, Surname, Privileges, Password, userName) VALUES (?, ?, ?, ?, ?)"
    db.query(ins,[req.body.name,req.body.surrname,0,pass,req.body.username],(err,data)=>{
        if(err){
            return res.json(err)
        }
       else return res.status(200).json("registered");
    });
    
};