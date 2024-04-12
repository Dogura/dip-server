import {database, db} from "../db.js"
import bcrypt from "bcryptjs";
import { getDatabase, ref, child, get, set } from "firebase/database";

export const getUsers = async (req,res)=>{
    var priv = req.body.priviledges
    var id = req.body.key
    var list =[]
    const dbRef = ref(database)

    await get(child(dbRef,"Groupchat/Users")).then((snapshot) => {    
        if (snapshot.exists()) {
            snapshot.forEach(element => {
            if((id != element.val().key) && (priv >= element.val().priviledges) ){
                list.push(element.val())
            }
            });
            console.log(list.length)

            return res.status(200).json(list)
        } 
        else {
            console.log("No data available");
            return res.status(401).json("No data")
        }
    }).catch((error) => {
        console.error(error);
    });
    return res.status(500)
};

export const setUsers = async (req,res)=>{
    console.log("Going into set1 ");
    try {
        const priv = req.body.priv;
        const id = req.body.id;

        console.log("Going into set2");
        await set(ref(database, 'Groupchat/Users/' + id + '/priviledges'), priv);

        console.log("Value set successfully");
        return res.status(200).send("Value set successfully");
    } catch (error) {
        console.error('Error setting value:', error);
        return res.status(500).send("Error setting value: " + error);
    }

};
export const resetPass = async (req,res)=>{
    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    const plaintextPassword = 'Heslo123';
    console.log("Going into reset ");
    var hh;
    hh = await bcrypt.hash(plaintextPassword, saltRounds);

    console.log("After bcrypt.hash()",hh);
    console.log("Going into set12 ",hh);
    try {
        const priv = req.body.priv;
        const id = req.body.id;

        console.log("Going into set2 ",hh);
        await set(ref(database, 'Groupchat/Users/' + id + '/password'), hh);

        console.log("Value set successfully");
        return res.status(200).send("Value set successfully");
    } catch (error) {
        console.error('Error setting value:', error);
        return res.status(500).send("Error setting value: " + error);
    }

};