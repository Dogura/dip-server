import {appAuth} from "../db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAuth, signInAnonymously } from 'firebase/auth';

import { getDatabase, ref, child, get } from "firebase/database";


/**
 * Handles user login.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export  const login = async (req,res)=>{
    const database = getDatabase(appAuth)

    const auth = getAuth(appAuth);
    const currentUser = getAuth(appAuth).currentUser;
    // If no current user, sign in anonymously
    if(!currentUser){
      await signInAnonymously(auth)
      .then(() => {
        console.log("Sign in ok")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // ...
      });
    }

    // Reference to the Firebase database
    const dbRef = ref(database)
    console.log(req.body)

    // Retrieve data from Firebase database
    get(child(dbRef,"Groupchat/Users")).then((snapshot) => {
    if (snapshot.exists()) {

       snapshot.forEach(element => {
        if(req.body.username == element.val().usserName){
            bcrypt.compare(req.body.password,element.val().password, (err,result) =>{
                if (err) {

                    return res.status(500).json("Error validace");
                  } else if (result) {

                    return res.json({element});
                  } else {

                    return res.status(401).json("Špatné jméno/heslo");
                  }
            })

        }
       });


    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });


};


/**
 * Handles user logout.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const logout = (req,res)=>{
  // Clear access token cookie
    res.clearCookie("access_token",{
        sameSite: "none",
        secure:true
    }).status(200).json("User has been loged out");
};