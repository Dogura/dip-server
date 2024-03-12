import mysql from "mysql";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
export const db = mysql.createConnection({
    host: "bk17dasluoctd9vhyo5m-mysql.services.clever-cloud.com",
    user: "uv7it9v85zrpfria",
    password : "WKi42mADpIcruRnJ724L",
    database : "bk17dasluoctd9vhyo5m",
    port: 3306 
});

const firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://dip-chating-app-default-rtdb.europe-west1.firebasedatabase.app/",
  };
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);