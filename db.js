import mysql from "mysql";
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase } from "firebase/database";






const firebaseConfig = {
   apiKey:"AIzaSyCM38Ll6dtvs07ZaVGqZvWAdgCuJXT37Ds",
    databaseURL: "https://dip-chating-app-default-rtdb.europe-west1.firebasedatabase.app/",
  };

  


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
signInAnonymously(auth)
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
//console.log(app)



// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);