import mysql from "mysql";
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "bubik",
    database : "mobile_app",
    port: 3306 
});