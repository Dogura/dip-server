import {db} from "../db.js";






export const addRoom = async (req,res)=>{
    console.log("addRoom from phone"+JSON.stringify(req.body));

    const q = "SELECT * FROM rooms WHERE name = ?";
    
    try {
        const data = await new Promise((resolve, reject) =>{
        db.query(q,[req.body.roomName],(err,data)=>{
            if(err){
                console.log("It is error"+ err)
                reject(err);
            }
            //console.log(data)
            resolve(data);
        });})

        if (data[0] !== undefined) {
            console.log(data[0])
            return res.status(404).json("UserName taken");
        } else {
            const q = "INSERT INTO rooms (name, idowner, key_val) VALUES (?, ?, ?);"
            db.query(q,[req.body.roomName,req.body.id,req.body.key_val],(err,data)=>{
                if(err){
                    console.log("It is error"+ err)
                    return res.status(405).json(err)
                }else{
                    return res.json({"message":"success"});
                }
            });
        
        }


    }
    catch(err){
        console.log("Error:", err);
        return res.status(405).json(err);
    }

}

export const deleteRoom =(req,res)=>{
    console.log("removeRoom from phone"+JSON.stringify(req.body));
    
}

export const getRooms = (req,res)=>{
    const q = "SELECT * FROM rooms WHERE idowner = ?"
    db.query(q,[req.body.idusers],(err,data)=>{
        if(err){
            //console.log("It is error")
            return res.json(err)
        }
        //console.log(data.length)
        if (data.length === 0) {
            return res.status(404).json("User not found!");}
        //console.log(data)
        return res.status(200).json(data);
    });


};

export const getRoomUsers = (req,res)=>{
    const q = "SELECT is_member.iduser, users.FirstName, users.userName, users.Surname, muted.muted, is_member.idroom from is_member RIGHT JOIN users ON is_member.iduser = users.idusers LEFT OUTER JOIN muted ON is_member.iduser = muted.iduser AND muted.idroom = ? where is_member.idroom = ?"
    db.query(q,[req.body.id,req.body.id],(err,data)=>{
        if(err){
            console.log("It is error")
            return res.json(err)
        }
        //console.log(data.length)
        if (data.length === 0) {
            console.log("data len")
            return res.status(404).json("User not found!");}
        //console.log(data)
        return res.status(200).json(data);
    });
}

export const mute = (req,res)=>{
    const q = "INSERT INTO muted (muted.iduser, muted.idroom, muted.muted) VALUES (?, ?, 1);"
    db.query(q,[req.body.iduser,req.body.idroom],(err,data)=>{
        if(err){
            console.log("It is error")
            console.log(err)
            return res.json(err)
        }
        //console.log(data.length)
        if (data.length === 0) {
            console.log("data len")
            return res.status(404).json("User not found!");}
        console.log(data)
        return res.status(200).json(data);
    });
}

export const unmute = (req,res)=>{
    console.log(req.body.iduser,req.body.idroom)
    if(req.body.iduser === undefined || req.body.idroom === undefined) 
        return 
    else{
        const q = "DELETE FROM muted WHERE muted.iduser = ? and muted.idroom = ?"
        db.query(q,[req.body.iduser,req.body.idroom],(err,data)=>{
            if(err){
                console.log("It is error")
                return res.json(err)
            }
            //console.log(data.length)
            if (data.length === 0) {
                console.log("data len")
                return res.status(404).json("User not found!");}
            //console.log(data)
            console.log("unmuted")
            return res.status(200).json(data);
        });
    }
}
    export const kick = (req,res)=>{
        console.log(req.body.iduser,req.body.idroom)
        if(req.body.iduser === undefined || req.body.idroom === undefined) 
            return 
        else{
            const q = "DELETE FROM is_member WHERE is_member.iduser = ? and is_member.idroom = ?"
            db.query(q,[req.body.iduser,req.body.idroom],(err,data)=>{
                if(err){
                    console.log("It is error")
                    return res.json(err)
                }
                //console.log(data.length)
                if (data.length === 0) {
                    console.log("data len")
                    return res.status(404).json("User not found!");}
                //console.log(data)
                console.log("unmuted")
                return res.status(200).json(data);
            });
        }
    }


