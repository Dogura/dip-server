import {db} from "../db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = (req,res)=>{
    console.log("login comming from phone" + JSON.stringify(req.body));
    const q = "SELECT * FROM users WHERE userName = ?"
    db.query(q,[req.body.username],(err,data)=>{
        console.log("data are " + data);
        if(err){
            return (res.status(404).json("error data")  + err);
        }
        if (data.length === 0) return res.status(404).json("User not found!");
        
        const isPassCorrect = bcrypt.compareSync(req.body.password, data[0].Password)
        if(!isPassCorrect) return res.status(400).json("wrong username or password!")

        const {Password, ...other} = data[0] 

        const token = jwt.sign({id:data[0].idusers},"hidennKey");
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json(other)
    });


};

export const loginPhone = (req,res)=>{
    console.log("login comming from phone" + JSON.stringify(req.body));
    const q = "SELECT * FROM users WHERE userName = ?"
    db.query(q,[req.body.username],(err,data)=>{
        console.log("data are " + JSON.stringify(data));
        if(err){
            console.log("mysql data error");
            return (res.status(404).json("error data")  + err);
        };
        if (data.length === 0){ 
            console.log("mysql data not found");
            return res.status(404).json("User not found!");
        };
        
        const isPassCorrect = bcrypt.compareSync(req.body.password, data[0].Password);
        if(!isPassCorrect) {
            console.log("inncorect password");
            return res.status(400).json("wrong username or password!");
        };
        const usName = data[0].userName
        const token = jwt.sign({ usName }, "hidennKey", { expiresIn: '1h' });
        console.log("all done returning token");
        res.json({ token });
      });


};


export const logout = (req,res)=>{
    res.clearCookie("access_token",{
        sameSite: "none",
        secure:true
    }).status(200).json("User has been loged out");
};