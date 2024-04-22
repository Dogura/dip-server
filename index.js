import  express from "express";
import homeRoutes from "./routes/home.js";
import loginRoutes from "./routes/login.js";
import usersRoutes from "./routes/users.js";
//import roomRoutes from "./routes/rooms.js";
//import registerRoutes from "./routes/register.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()



app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use("/server/home", homeRoutes)
//app.use("/server/register", registerRoutes)
app.use("/server/login", loginRoutes)
app.use("/server/users", usersRoutes)
//app.use("/server/rooms", roomRoutes)


app.listen(8800, ()=>{
    console.log("Connected to backend!5")
});