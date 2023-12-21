import express from "express";
import {config} from "dotenv";
import errorMiddleware from "./middlewares/error.js";
import cookiParser from "cookie-parser";
import cors from "cors";
const app =express();

//  using middleware 

if (process.env.NODE_ENV !== "Production") {
    config({path:'./config/config.env'});
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookiParser());


app.use(cors({
    origin: "https://mobile-delivery-frontend.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));


// importing routes path
import user from "./routes/userRoute.js";
import mobile from "./routes/mobileRoute.js";

//using imported routes from above

app.use('/api/v1',user);
app.use('/api/v1',mobile);

app.get('/',(req,res)=>{
    res.send("working");
})

export default app;

// using errorMiddleware
app.use(errorMiddleware);