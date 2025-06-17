import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();
const port= process.env.PORT ||3000;
dotenv.config();

const connectDB = async () => {
    try {
    //    await mongoose.connect(process.env.MONGO_DB);
    await mongoose.connect(process.env.MONGO_DB);
        console.log("Connected to database.");
    } catch (error) {
        console.log(error);
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
    setTimeout(connectDB,port);
})

app.get("/api",(req,res)=>{
    res.send("Hello,this is the first request");
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

//Error handling middleware 

app.use((err,req,res,next)=>{
     const errorStatus=err.status||500;
     const errorMessage=err.message||"Something went wrong!";
     return res.status(errorStatus).json({
         success:false,
         status:errorStatus,
         message:errorMessage,
         stack:err.stack,
     })
});

app.listen(7000, () => {
    connectDB();
    console.log("Server is running.");
})