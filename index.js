import  express from "express";
import homeRoutes from "./routes/home.js";
import loginRoutes from "./routes/login.js";
import usersRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';

// Initialize Express app
const app = express()



// Load environment variables from .env file
dotenv.config();


// Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Middleware to check API key
app.use((req, res, next) => {

    const token = req.headers['x_api_key'];
    if (token == process.env.API_TOKEN) {
        next();
    } else {
        console.log(headers)
        console.log("fail")
        return res.status(401);
    }
});

// Routes
app.use("/server/home", homeRoutes)
app.use("/server/login", loginRoutes)
app.use("/server/users", usersRoutes)

// Start the server
app.listen(8800, ()=>{
    console.log("Connected to backend!5")
});