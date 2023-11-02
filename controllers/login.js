import {db} from "../db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const dbQuery = util.promisify(db.query);

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

export const loginPhone = async (req,res)=>{
    console.log("login comming from phone" + JSON.stringify(req.body));
    const q = "SELECT * FROM users WHERE userName = ?"
    try{
        const data = await dbQuery(q,[req.body.username],(err,data)=>{
            console.log("data are " + JSON.stringify(data));
            if(err)
                return "Error"
            else
                return data
        });
        if(data === "Error"){
            console.log("mysql data error");
            return (res.status(422).json("database error"));
        }
        if(data.length === 0){
            console.log("mysql data not found");
            return res.status(406).json("User not found!");
        }
        console.log("mysql data error "+JSON.stringify(data))
        const isPassCorrect = bcrypt.compareSync(req.body.password, data[0].Password);
        if(!isPassCorrect) {
            console.log("inncorect password");
            return res.status(406).json("wrong username or password!");
        };
        return res.json({ "message":"success" });
    }catch(err) {
        console.log("Error:", err);
        return res.status(500).json(err);
    }

};


export const logout = (req,res)=>{
    res.clearCookie("access_token",{
        sameSite: "none",
        secure:true
    }).status(200).json("User has been loged out");
};