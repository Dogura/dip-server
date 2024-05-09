import mysql from "mysql";
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import fetch from 'node-fetch';

import dotenv from 'dotenv';

dotenv.config();

globalThis.fetch = fetch;


/*
API_KEY = "AIzaSyCM38Ll6dtvs07ZaVGqZvWAdgCuJXT37Ds",
DATABASE_URL = "https://dip-chating-app-default-rtdb.europe-west1.firebasedatabase.app/"
*/
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    databaseURL: process.env.DATABASE_URL,
  };

  


const app = initializeApp(firebaseConfig);
console.log()



// Initialize Realtime Database and get a reference to the service
export const appAuth = app;