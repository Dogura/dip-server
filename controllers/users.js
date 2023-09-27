import {db} from "../db.js"

export const getUsers = (req,res)=>{
    console.log("wrawrwdawdawdawdaw");
    const q = "SELECT * FROM users WHERE Privileges <= ? AND idusers != ?"
    db.query(q,[req.body.Privileges, req.body.idusers],(err,data)=>{
        if(err){
            //console.log("It is error")
            return res.json(err)
        }
        //console.log(data.length)
        if (data.length === 0) {
            return res.status(404).json("User not found!");}
        //console.log(data)
        return res.status(200).json(data)
    });


};

export const setUsers = (req,res)=>{
    const q = "UPDATE users set Privileges = ? WHERE idusers = ?"
    db.query(q,[req.body.priv, req.body.id],(err,data)=>{
        if(err){
            return res.json(err)
        }
        if (data.length === 0) return res.status(404).json("User not found!");
        return res.status(200).json("Success");
    });


};