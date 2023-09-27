import mysql from "mysql";
export const db = mysql.createConnection({
    host: "bk17dasluoctd9vhyo5m-mysql.services.clever-cloud.com",
    user: "uv7it9v85zrpfria",
    password : "WKi42mADpIcruRnJ724L",
    database : "bk17dasluoctd9vhyo5m",
    port: 3306 
});