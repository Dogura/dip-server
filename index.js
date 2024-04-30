import  express from "express";
import homeRoutes from "./routes/home.js";
import loginRoutes from "./routes/login.js";
import usersRoutes from "./routes/users.js";
//import roomRoutes from "./routes/rooms.js";
//import registerRoutes from "./routes/register.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();


const app = express()
//require('dotenv').config();





app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use((req, res, next) => {
    console.log(req.headers['x_api_key'])
    console.log(process.env.API_TOKEN)
    const token = req.headers['x_api_key'];
    if (token == process.env.API_TOKEN) {
        next();
    } else {
        console.log(headers)
        console.log("fail")
        return res.status(401);
    }
});
app.use("/server/home", homeRoutes)
//app.use("/server/register", registerRoutes)
app.use("/server/login", loginRoutes)
app.use("/server/users", usersRoutes)
//app.use("/server/rooms", roomRoutes)


app.listen(8800, ()=>{
    console.log("Connected to backend!5")
});