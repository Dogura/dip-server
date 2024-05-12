import mysql from "mysql";
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import fetch from 'node-fetch';

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Polyfill for fetch in Node.js environment
globalThis.fetch = fetch;

// Firebase configuration object
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    databaseURL: process.env.DATABASE_URL,
  };

  

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
console.log()


// Exporting the initialized Firebase app for authentication
export const appAuth = app;