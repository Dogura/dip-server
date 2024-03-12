import {database, db} from "../db.js"
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
    var priv = req.body.priv
    var id = req.body.id
    const dbRef = database
    await set(ref(database,'Groupchat/Users/'+id+'/priviledges'),priv)
    .then(() => {
      console.log('Value set successfully');
      return res.status(200)
    })
    .catch((error) => {
      console.error('Error setting value:', error);
      return res.status(500).json(error)
    });

return res.status(500)

};