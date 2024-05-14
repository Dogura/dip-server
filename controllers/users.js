import {appAuth} from "../db.js"
import bcrypt from "bcryptjs";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { getAuth, signInAnonymously } from 'firebase/auth';




/**
 * Retrieves users based on privileges and key.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getUsers = async (req,res)=>{
    const database = getDatabase(appAuth)
    const currentUser = getAuth(appAuth).currentUser;
    // Check if user is authenticated
    if(!currentUser){
        return res.status(403).json("Vypršelo přihlášení")
    }

    // Extract data from request
    var priv = req.body.priviledges
    var id = req.body.key
    var list =[]

    // Reference to the Firebase database
    const dbRef = ref(database)

    // Retrieve data from Firebase database
    await get(child(dbRef,"Groupchat/Users")).then((snapshot) => {    
        var top = null
        if (snapshot.exists()) {
            snapshot.forEach(element => {
            if((id != element.val().key) && (priv >= element.val().priviledges) ){
                list.push(element.val())
  
            }
            if(id == element.val().key){
                top = element.val()
            }
            });
            console.log(list.length)
            list.sort((a,b)=>b.priviledges-a.priviledges)
            if(top){
                list.splice(0,0,top)
                console.log(top)
            }
            return res.status(200).json(list)
        } 
        else {
            console.log("Data nenalezena");
            return res.status(404).json("No data")
        }
    }).catch((error) => {
        console.error(error);
    });
    return res.status(500)
};


/**
 * Sets user privileges.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const setUsers = async (req,res)=>{
    const database = getDatabase(appAuth)
    const currentUser = getAuth(appAuth).currentUser;

    // Check if user is authenticated
    if(!currentUser){
        return res.status(403).json("Vypršelo přihlášení")
    }

    console.log("Going into set1 ");
    try {

        // Extract data from request
        const priv = req.body.priv;
        const id = req.body.id;

        console.log("Going into set2");

         // Set user privileges in Firebase database
        await set(ref(database, 'Groupchat/Users/' + id + '/priviledges'), priv);

        console.log("Value set successfully");
        return res.status(200).send("Hodnota úspěšně změněna");
    } catch (error) {
        console.error('Error setting value:', error);
        return res.status(500).send("Chyba: " + error);
    }

};

/**
 * Resets user password.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const resetPass = async (req,res)=>{
    const database = getDatabase(appAuth)
    const currentUser = getAuth(appAuth).currentUser;

    // Check if user is authenticated
    if(!currentUser){
        return res.status(403).json("Vypršelo přihlášení")
    }

    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    const plaintextPassword = req.body.pass;
    console.log("Going into reset ");
    var hh;

     // Hash the new password
    hh = await bcrypt.hash(plaintextPassword, saltRounds);

    console.log("After bcrypt.hash()",hh);
    console.log("Going into set12 ",hh);
    try {

         // Extract data from request
        const priv = req.body.priv;
        const id = req.body.id;

        console.log("Going into set2 ",hh);
        
        // Set hashed password in Firebase database
        await set(ref(database, 'Groupchat/Users/' + id + '/password'), hh);

        console.log("Value set successfully");
        return res.status(200).send("Heslo zresetováno");
    } catch (error) {
        console.error('Error setting value:', error);
        return res.status(500).send("Chyba: " + error);
    }

};