import {database, db} from "../db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDatabase, ref, child, get } from "firebase/database";


export const login = (req,res)=>{

    //console.log("im in login" +req.body.username);
    const dbRef = ref(database)
    get(child(dbRef,"Groupchat/Users")).then((snapshot) => {
    if (snapshot.exists()) {
       // console.log(snapshot.val());
       snapshot.forEach(element => {
        if(req.body.username == element.val().usserName){
            bcrypt.compare(req.body.password,element.val().password, (err,result) =>{
                if (err) {
                  //  console.error('Error comparing passwords:', err);
                    return res.status(500).json("Error validace");
                  } else if (result) {
                   // console.log('Passwords match!'); // Authentication successful
                    return res.json({element});
                  } else {
                    //console.log('Passwords do not match.'); // Authentication failed
                    return res.status(401).json("Špatné jméno/heslo");
                  }
            })

        }
        //console.log("person "+element.val().name);
       });


    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });


};




export const logout = (req,res)=>{
    res.clearCookie("access_token",{
        sameSite: "none",
        secure:true
    }).status(200).json("User has been loged out");
};